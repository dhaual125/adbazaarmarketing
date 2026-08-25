"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

export const FooterTetris: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const gameLoopRef = useRef<number | null>(null);
  const boardRef = useRef<number[][]>([]);
  const currentPieceRef = useRef<{
    shape: number[][];
    x: number;
    y: number;
    color: string;
  } | null>(null);

  const COLS = 10;
  const ROWS = 20;
  const BLOCK_SIZE = 18;

  const COLORS = [
    "#000000",
    "#2563eb", // I
    "#f97316", // O
    "#7c3aed", // T
    "#16a34a", // S
    "#7c3aed", // Z
    "#f97316", // J
    "#2563eb", // L
  ];

  const SHAPES = [
    [],
    [[1, 1, 1, 1]], // I
    [[2, 2], [2, 2]], // O
    [[0, 3, 0], [3, 3, 3]], // T
    [[0, 4, 4], [4, 4, 0]], // S
    [[5, 5, 0], [0, 5, 5]], // Z
    [[6, 0, 0], [6, 6, 6]], // J
    [[0, 0, 7], [7, 7, 7]], // L
  ];

  const createBoard = () =>
    Array.from({ length: ROWS }, () => Array(COLS).fill(0));

  const spawnPiece = useCallback(() => {
    const typeId = Math.floor(Math.random() * 7) + 1;
    const shape = SHAPES[typeId];
    currentPieceRef.current = {
      shape,
      x: Math.floor(COLS / 2) - Math.floor(shape[0].length / 2),
      y: 0,
      color: COLORS[typeId],
    };
  }, []);

  const collide = useCallback((piece: { shape: number[][]; x: number; y: number }, board: number[][]) => {
    for (let r = 0; r < piece.shape.length; r++) {
      for (let c = 0; c < piece.shape[r].length; c++) {
        if (piece.shape[r][c] !== 0) {
          const newX = piece.x + c;
          const newY = piece.y + r;
          if (
            newX < 0 ||
            newX >= COLS ||
            newY >= ROWS ||
            (newY >= 0 && board[newY][newX] !== 0)
          ) {
            return true;
          }
        }
      }
    }
    return false;
  }, []);

  const mergePiece = useCallback(() => {
    const piece = currentPieceRef.current;
    if (!piece) return;
    const board = boardRef.current;

    for (let r = 0; r < piece.shape.length; r++) {
      for (let c = 0; c < piece.shape[r].length; c++) {
        if (piece.shape[r][c] !== 0) {
          if (piece.y + r < 0) {
            setIsGameOver(true);
            return;
          }
          board[piece.y + r][piece.x + c] = piece.shape[r][c];
        }
      }
    }

    let linesCleared = 0;
    for (let r = ROWS - 1; r >= 0; r--) {
      if (board[r].every((cell) => cell !== 0)) {
        board.splice(r, 1);
        board.unshift(Array(COLS).fill(0));
        linesCleared++;
        r++;
      }
    }

    if (linesCleared > 0) {
      setScore((prev) => prev + linesCleared * 100);
    }

    spawnPiece();
    if (collide(currentPieceRef.current!, board)) {
      setIsGameOver(true);
    }
  }, [collide, spawnPiece]);

  const moveLeft = useCallback(() => {
    const p = currentPieceRef.current;
    if (!p || isGameOver) return;
    if (!collide({ ...p, x: p.x - 1 }, boardRef.current)) {
      p.x -= 1;
    }
  }, [collide, isGameOver]);

  const moveRight = useCallback(() => {
    const p = currentPieceRef.current;
    if (!p || isGameOver) return;
    if (!collide({ ...p, x: p.x + 1 }, boardRef.current)) {
      p.x += 1;
    }
  }, [collide, isGameOver]);

  const moveDown = useCallback(() => {
    const p = currentPieceRef.current;
    if (!p || isGameOver) return;
    if (!collide({ ...p, y: p.y + 1 }, boardRef.current)) {
      p.y += 1;
    } else {
      mergePiece();
    }
  }, [collide, isGameOver, mergePiece]);

  const rotate = useCallback(() => {
    const p = currentPieceRef.current;
    if (!p || isGameOver) return;
    const rotated = p.shape[0].map((_, i) =>
      p.shape.map((row) => row[i]).reverse()
    );
    if (!collide({ ...p, shape: rotated }, boardRef.current)) {
      p.shape = rotated;
    }
  }, [collide, isGameOver]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isPlaying || isGameOver) return;
      if (e.key === "ArrowLeft" || e.key === "a") moveLeft();
      if (e.key === "ArrowRight" || e.key === "d") moveRight();
      if (e.key === "ArrowDown" || e.key === "s") moveDown();
      if (e.key === "ArrowUp" || e.key === "w" || e.key === " ") rotate();
    },
    [isPlaying, isGameOver, moveLeft, moveRight, moveDown, rotate]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const startGame = () => {
    boardRef.current = createBoard();
    setScore(0);
    setIsGameOver(false);
    setIsPlaying(true);
    spawnPiece();
  };

  const stopGame = () => {
    setIsPlaying(false);
    if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
  };

  useEffect(() => {
    if (!isPlaying) return;

    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    let lastTick = performance.now();

    const draw = (now: number) => {
      if (now - lastTick > 500 && !isGameOver) {
        moveDown();
        lastTick = now;
      }

      ctx.clearRect(0, 0, cv.width, cv.height);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, cv.width, cv.height);

      ctx.strokeStyle = "#f0f0f0";
      ctx.lineWidth = 1;
      for (let c = 0; c <= COLS; c++) {
        ctx.moveTo(c * BLOCK_SIZE, 0);
        ctx.lineTo(c * BLOCK_SIZE, ROWS * BLOCK_SIZE);
      }
      for (let r = 0; r <= ROWS; r++) {
        ctx.moveTo(0, r * BLOCK_SIZE);
        ctx.lineTo(COLS * BLOCK_SIZE, r * BLOCK_SIZE);
      }
      ctx.stroke();

      const board = boardRef.current;
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          if (board[r][c] !== 0) {
            ctx.fillStyle = COLORS[board[r][c]];
            ctx.fillRect(
              c * BLOCK_SIZE + 1,
              r * BLOCK_SIZE + 1,
              BLOCK_SIZE - 2,
              BLOCK_SIZE - 2
            );
          }
        }
      }

      const piece = currentPieceRef.current;
      if (piece) {
        for (let r = 0; r < piece.shape.length; r++) {
          for (let c = 0; c < piece.shape[r].length; c++) {
            if (piece.shape[r][c] !== 0) {
              ctx.fillStyle = piece.color;
              ctx.fillRect(
                (piece.x + c) * BLOCK_SIZE + 1,
                (piece.y + r) * BLOCK_SIZE + 1,
                BLOCK_SIZE - 2,
                BLOCK_SIZE - 2
              );
            }
          }
        }
      }

      gameLoopRef.current = requestAnimationFrame(draw);
    };

    gameLoopRef.current = requestAnimationFrame(draw);

    return () => {
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
    };
  }, [isPlaying, isGameOver, moveDown]);

  return (
    <footer className={`relative z-2 bg-transparent overflow-hidden transition-all duration-500 ${isPlaying ? "h-[390px]" : "h-28"}`}>
      {!isPlaying && (
        <button
          type="button"
          onClick={startGame}
          aria-label="Play Tetris"
          className="tt-teaser btn-site pixel-clip font-mono uppercase tracking-widest text-xs py-3 px-6"
        >
          PLAY TETRIS
        </button>
      )}

      {isPlaying && (
        <div className="relative w-full h-full flex items-center justify-center bg-white/90 backdrop-blur-sm">
          <div className="relative border border-black/20 bg-white">
            <canvas
              ref={canvasRef}
              width={COLS * BLOCK_SIZE}
              height={ROWS * BLOCK_SIZE}
              className="block"
            />
          </div>

          <button
            type="button"
            onClick={stopGame}
            aria-label="Close Tetris"
            className="tt-close absolute top-4 right-6 w-9 h-9 bg-white border border-black/20 text-black flex items-center justify-center hover:bg-black hover:text-white pixel-clip-btn"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          <div className="tt-score absolute top-4 left-6 font-mono text-lg font-bold text-black tracking-widest">
            SCORE: {score}
          </div>

          <div className="tt-pad absolute right-6 bottom-6 grid grid-cols-4 gap-2">
            <button
              type="button"
              onClick={moveLeft}
              className="w-11 h-11 bg-white border border-black/20 text-black flex items-center justify-center hover:bg-black hover:text-white pixel-clip-btn"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={rotate}
              className="w-11 h-11 bg-white border border-black/20 text-black flex items-center justify-center hover:bg-black hover:text-white pixel-clip-btn"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <path d="M21 12a9 9 0 11-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
                <path d="M21 3v5h-5" />
              </svg>
            </button>
            <button
              type="button"
              onClick={moveDown}
              className="w-11 h-11 bg-white border border-black/20 text-black flex items-center justify-center hover:bg-black hover:text-white pixel-clip-btn"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={moveRight}
              className="w-11 h-11 bg-white border border-black/20 text-black flex items-center justify-center hover:bg-black hover:text-white pixel-clip-btn"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {isGameOver && (
            <div className="tt-over absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-white/90 backdrop-blur-sm text-center">
              <div className="ttl font-normal text-3xl tracking-tight text-black">
                GAME OVER
              </div>
              <p className="font-mono text-sm text-gray-600">Final Score: {score}</p>
              <button
                type="button"
                onClick={startGame}
                className="tt-again btn-site text-sm py-2 px-6"
              >
                PLAY AGAIN
              </button>
            </div>
          )}
        </div>
      )}
    </footer>
  );
};
