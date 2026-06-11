"use client";

import { motion } from "framer-motion";
import { Home, ArrowLeft, Compass } from "lucide-react";
import Link from "next/link";

interface CategoryNotFoundProps {
    slug?: string;
}

export default function CategoryNotFound({ slug }: CategoryNotFoundProps) {
    return (
        <div className="cnf-root">
            {/* Ambient background glows */}
            <div className="cnf-glow cnf-glow-1" />
            <div className="cnf-glow cnf-glow-2" />
            <div className="cnf-grid" />

            <motion.div
                className="cnf-wrap"
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                {/* Crystal ball icon — matches the screenshot vibe */}
                <motion.div
                    className="cnf-icon-wrap"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                    <div className="cnf-ball">
                        <div className="cnf-ball-inner">
                            <Compass size={40} className="cnf-compass" />
                        </div>
                        <div className="cnf-ball-glow" />
                        <div className="cnf-ball-shine" />
                    </div>
                    <div className="cnf-stand" />
                </motion.div>

                {/* Text */}
                <motion.div
                    className="cnf-text"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                >
                    <h1 className="cnf-title">Page not found</h1>

                    {slug ? (
                        <p className="cnf-desc">
                            <span className="cnf-slug">/{slug}</span> doesn't match any category.
                            <br />
                            It may have been removed or never existed.
                        </p>
                    ) : (
                        <p className="cnf-desc">
                            This page doesn't exist or has been removed.
                            <br />
                            Head back and explore active events.
                        </p>
                    )}
                </motion.div>

                {/* Actions */}
                <motion.div
                    className="cnf-actions"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.4 }}
                >
                    <Link href="/" className="cnf-btn cnf-btn-primary">
                        <Home size={16} />
                        Go home
                    </Link>
                    <button onClick={() => window.history.back()} className="cnf-btn cnf-btn-outline">
                        <ArrowLeft size={16} />
                        Go back
                    </button>
                </motion.div>
            </motion.div>

            <style>{`
        .cnf-root {
          min-height: 70vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          padding: 40px 20px;
          background: transparent;
        }

        /* ── Ambient glows ── */
        .cnf-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
        }
        .cnf-glow-1 {
          width: 480px; height: 480px;
          background: radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 70%);
          top: -80px; left: -100px;
          animation: cnfBreathe 8s ease-in-out infinite;
        }
        .cnf-glow-2 {
          width: 360px; height: 360px;
          background: radial-gradient(circle, rgba(244,212,124,0.08) 0%, transparent 70%);
          bottom: -60px; right: -80px;
          animation: cnfBreathe 10s ease-in-out infinite reverse;
        }
        .cnf-grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(212,175,55,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212,175,55,0.03) 1px, transparent 1px);
          background-size: 48px 48px;
        }

        /* ── Wrap ── */
        .cnf-wrap {
          position: relative; z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 32px;
          text-align: center;
          max-width: 440px;
          width: 100%;
        }

        /* ── Crystal ball ── */
        .cnf-icon-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
        }
        .cnf-ball {
          position: relative;
          width: 120px; height: 120px;
        }
        .cnf-ball-inner {
          width: 120px; height: 120px;
          border-radius: 50%;
          background: radial-gradient(
            circle at 35% 30%,
            rgba(212,175,55,0.18) 0%,
            rgba(18,18,22,0.95) 60%,
            rgba(10,10,12,1) 100%
          );
          border: 1px solid rgba(212,175,55,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 2;
          box-shadow:
            inset 0 -8px 24px rgba(0,0,0,0.5),
            inset 0 4px 12px rgba(212,175,55,0.08),
            0 20px 50px rgba(212,175,55,0.15),
            0 0 0 1px rgba(212,175,55,0.08);
        }
        .cnf-compass {
          color: #D4AF37;
          filter: drop-shadow(0 0 12px rgba(212,175,55,0.5));
        }
        .cnf-ball-glow {
          position: absolute;
          inset: -12px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(212,175,55,0.14) 0%, transparent 70%);
          filter: blur(16px);
          z-index: 1;
          animation: cnfGlowPulse 3s ease-in-out infinite;
        }
        .cnf-ball-shine {
          position: absolute;
          top: 14px; left: 22px;
          width: 28px; height: 14px;
          border-radius: 50%;
          background: rgba(255,255,255,0.08);
          transform: rotate(-30deg);
          z-index: 3;
          pointer-events: none;
        }

        /* stand */
        .cnf-stand {
          width: 60px; height: 18px;
          background: linear-gradient(180deg, #1a1a20 0%, #0e0e12 100%);
          border: 1px solid rgba(212,175,55,0.15);
          border-top: none;
          border-radius: 0 0 30px 30px;
          margin-top: -2px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.4);
        }

        /* ── Text ── */
        .cnf-text { display: flex; flex-direction: column; gap: 12px; }

        .cnf-title {
          font-family: 'Inter', sans-serif;
          font-size: 28px;
          font-weight: 900;
          letter-spacing: -0.04em;
          color: #f0f0f0;
          line-height: 1.1;
        }

        .cnf-desc {
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 400;
          color: #8a8a9a;
          line-height: 1.7;
        }

        .cnf-slug {
          display: inline-block;
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.04em;
          color: #D4AF37;
          background: rgba(212,175,55,0.07);
          border: 1px solid rgba(212,175,55,0.18);
          padding: 2px 10px;
          border-radius: 6px;
        }

        /* ── Buttons ── */
        .cnf-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .cnf-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 11px 22px;
          border-radius: 10px;
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.04em;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.2s ease;
          border: none;
        }

        .cnf-btn-primary {
          background: linear-gradient(135deg, #c9a227 0%, #F4D47C 50%, #D4AF37 100%);
          color: #0a0a0c;
          box-shadow: 0 4px 20px rgba(212,175,55,0.35);
          border: 1px solid rgba(212,175,55,0.4);
        }
        .cnf-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(212,175,55,0.5);
        }

        .cnf-btn-outline {
          background: rgba(212,175,55,0.05);
          color: #D4AF37;
          border: 1px solid rgba(212,175,55,0.2);
        }
        .cnf-btn-outline:hover {
          background: rgba(212,175,55,0.1);
          border-color: #D4AF37;
          transform: translateY(-1px);
        }

        /* ── Animations ── */
        @keyframes cnfBreathe {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.06); }
        }
        @keyframes cnfGlowPulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.1); }
        }

        /* ── Mobile ── */
        @media (max-width: 480px) {
          .cnf-title { font-size: 22px; }
          .cnf-desc  { font-size: 13px; }
          .cnf-ball  { width: 96px; height: 96px; }
          .cnf-ball-inner { width: 96px; height: 96px; }
          .cnf-btn   { padding: 10px 18px; font-size: 12px; }
        }
      `}</style>
        </div>
    );
}