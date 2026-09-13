import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import { BatteryCharging, Dumbbell, ShieldCheck, Sparkles } from 'lucide-react';
import './scroll-story.css';

const stages = [
  {
    number: '01',
    label: 'ENERGIA',
    title: 'Entre no treino com intenção.',
    text: 'Pré-treinos, eletrólitos e escolhas para chegar com foco ao treino.',
    icon: BatteryCharging,
  },
  {
    number: '02',
    label: 'PERFORMANCE',
    title: 'Construa consistência.',
    text: 'Creatina e rotina consistente para sustentar força e evolução.',
    icon: Dumbbell,
  },
  {
    number: '03',
    label: 'RECUPERAÇÃO',
    title: 'Recupere para repetir.',
    text: 'Proteínas e suporte diário para recuperar e voltar melhor.',
    icon: ShieldCheck,
  },
];

function ScrollStoryContent() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [progress, setProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Conclui a jornada antes de a seção deixar a área fixa, mantendo o 100% visível.
  const storyProgress = useTransform(scrollYProgress, [0, 0.9], [0, 1], {
    clamp: true,
  });
  const markerLeft = useTransform(storyProgress, [0, 1], ['0%', '100%']);
  const markerRotate = useTransform(storyProgress, [0, 1], [0, 360]);
  const glowScale = useTransform(storyProgress, [0, 0.5, 1], [0.82, 1.12, 0.94]);

  useMotionValueEvent(storyProgress, 'change', (value) => {
    setProgress(Math.min(100, Math.round(value * 100)));
  });

  const activeIndex = progress < 34 ? 0 : progress < 67 ? 1 : 2;

  return (
    <section ref={sectionRef} className="scroll-story" aria-label="Jornada Nutrimax">
      <div className="scroll-story-sticky">
        <motion.div
          className="story-glow"
          aria-hidden="true"
          style={reduce ? undefined : { scale: glowScale }}
        />

        <div className="story-head">
          <div>
            <span className="story-kicker">[ EVOLUÇÃO EM MOVIMENTO ]</span>
            <h2>Seu objetivo muda.<br />Seu ritmo acompanha.</h2>
          </div>
          <div className="story-meta">
            <p>
              Role para acompanhar a sequência que conecta energia, performance e recuperação.
            </p>
            <div className="story-counter" aria-label={`Progresso ${progress}%`}>
              <span>PROGRESSO</span>
              <strong>{String(progress).padStart(2, '0')}%</strong>
            </div>
          </div>
        </div>

        <div className="story-rail-wrap" aria-hidden="true">
          <div className="story-rail">
            <motion.div className="story-rail-fill" style={{ scaleX: storyProgress }} />
            {stages.map((stage, index) => (
              <span
                className={`story-node ${activeIndex >= index ? 'reached' : ''}`}
                key={stage.number}
                style={{ left: `${index * 50}%` }}
              />
            ))}
            <motion.div className="story-marker-position" style={{ left: markerLeft }}>
              <motion.div
                className="story-marker"
                style={reduce ? undefined : { rotate: markerRotate }}
              >
                <Sparkles size={17} />
              </motion.div>
            </motion.div>
          </div>
        </div>

        <div className="story-stage-grid">
          {stages.map((stage, index) => {
            const Icon = stage.icon;
            const active = activeIndex === index;
            const reached = activeIndex > index;

            return (
              <motion.article
                className={`story-stage ${active ? 'active' : ''} ${reached ? 'reached' : ''}`}
                key={stage.number}
                aria-current={active ? 'step' : undefined}
                animate={
                  reduce
                    ? { opacity: 1, y: 0, scale: 1 }
                    : {
                        opacity: 1,
                        y: active ? 0 : 5,
                        scale: active ? 1 : 0.992,
                      }
                }
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="story-stage-top">
                  <span className="story-stage-number">{stage.number}</span>
                  <span className="story-stage-icon"><Icon size={21} /></span>
                </div>
                <small>{stage.label}</small>
                <h3>{stage.title}</h3>
                <p>{stage.text}</p>
              </motion.article>
            );
          })}
        </div>

        <div className="story-hint">
          <span>ROLE PARA CONTINUAR</span>
          <motion.span
            className="story-hint-line"
            animate={reduce ? undefined : { scaleX: [0.25, 1, 0.25] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </div>
    </section>
  );
}

export default function ScrollStory() {
  const [host, setHost] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const experience = document.getElementById('experiencia');
    const parent = experience?.parentElement;

    if (!experience || !parent) return;

    const mount = document.createElement('div');
    mount.id = 'scroll-story-host';
    parent.insertBefore(mount, experience);
    setHost(mount);

    return () => mount.remove();
  }, []);

  if (!host) return null;
  return createPortal(<ScrollStoryContent />, host);
}
