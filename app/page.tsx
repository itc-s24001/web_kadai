"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";

const Page = () => {
  const [question, setQuestion] = useState("ポケモンの名前は何ですか？");
  const [imageUrl, setImageUrl] = useState("");
  const [choices, setChoices] = useState<string[]>([]);
  const [correctName, setCorrectName] = useState("");

  // ポケモンデータ取得関数
  const getPokemonData = useCallback(async (id: number) => {
    const pokeApiBaseUrl = process.env.NEXT_PUBLIC_POKEAPI_BASE_URL;
    if (!pokeApiBaseUrl) {
      console.error(
        "環境変数 NEXT_PUBLIC_POKEAPI_BASE_URL が設定されていません。"
      );
      return null;
    }

    try {
      const response = await fetch(`${pokeApiBaseUrl}/pokemon/${id}`);
      if (!response.ok) throw new Error("データ取得失敗");
      const data: {
        name: string;
        types: { type: { name: string } }[];
        sprites: { front_default: string | null };
      } = await response.json();
      return data;
    } catch (error) {
      console.error("ポケモンデータ取得エラー:", error);
      return null;
    }
  }, []);

  // 問題を出題する関数
  const askQuestion = useCallback(async () => {
    const randomIds = Array.from(
      { length: 4 },
      () => Math.floor(Math.random() * 898) + 1
    );
    const pokemonData = (
      await Promise.all(randomIds.map((id) => getPokemonData(id)))
    ).filter((p): p is NonNullable<typeof p> => p !== null);

    if (pokemonData.length < 4) {
      console.error("ポケモンデータが不足しています。");
      return;
    }

    const correctPokemon = pokemonData[Math.floor(Math.random() * 4)];
    if (!correctPokemon || !correctPokemon.sprites.front_default) {
      console.error("正しいポケモンデータが取得できませんでした。");
      return;
    }

    const correctName =
      correctPokemon.name.charAt(0).toUpperCase() +
      correctPokemon.name.slice(1);
    setCorrectName(correctName);
    setImageUrl(correctPokemon.sprites.front_default);
    setChoices(
      pokemonData.map((p) => p.name.charAt(0).toUpperCase() + p.name.slice(1))
    );
    setQuestion(
      `このポケモンの名前は何ですか？ (タイプ: ${correctPokemon.types
        .map((t) => t.type.name)
        .join(", ")})`
    );
  }, [getPokemonData]);

  // ユーザーの選択をチェックする関数
  const checkAnswer = (selected: string) => {
    if (selected.toLowerCase() === correctName.toLowerCase()) {
      alert("正解！🎉");
    } else {
      alert(`不正解！正しい答えは ${correctName} です。`);
    }
    askQuestion(); // 次の問題を出題
  };

  useEffect(() => {
    askQuestion();
  }, [askQuestion]);

  return (
    <div className="container text-center">
      <h2 className="my-4">{question}</h2>
      <div className="d-flex justify-content-center mb-3">
        {imageUrl ? (
          <Image src={imageUrl} alt="ポケモンの画像" width={200} height={200} />
        ) : (
          <p>画像がありません</p>
        )}
      </div>
      <div className="d-flex justify-content-center flex-wrap gap-2">
        {choices.map((choice, index) => (
          <button
            key={index}
            className="btn btn-primary"
            onClick={() => checkAnswer(choice)}
          >
            {choice}
          </button>
        ))}
      </div>
      <button className="btn btn-dark mt-3" onClick={askQuestion}>
        次の問題へ
      </button>
    </div>
  );
};

export default Page;
