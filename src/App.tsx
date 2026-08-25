import { FormEvent, useEffect, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Instagram,
  Menu,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  X,
  Zap,
} from 'lucide-react';

const goals: Record<string, string> = {
  performance: 'Creatina e pré-treinos',
  proteina: 'Proteínas e recuperação',
  rotina: 'Vitaminas e bem-estar',
  duvida: 'Atendimento personalizado',
};

function RevealLink({ href, children }: { href: string; children: string }) {
  return (
    <motion.a
      className="reveal-link"
      href={href}
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      <motion.span
        className="reveal-track"
        variants={{ rest: { y: '0%' }, hover: { y: '-50%' } }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </motion.span>
    </motion.a>
  );
}

function WordReveal({ text }: { text: string }) {
  const words = text.split(' ');

  return (
    <p className="word-reveal" aria-label={text}>
      {words.map((word, index) => (
        <motion.span
          aria-hidden="true"
          key={`${word}-${index}`}
          initial={{ opacity: 0.13, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.45, delay: index * 0.025 }}
        >
          {word}&nbsp;
        </motion.span>
      ))}
    </p>
  );
}

function NutrimaxLoader() {
  return (
    <motion.div
      className="loader-screen"
      role="status"
      aria-live="polite"
      aria-label="Carregando Nutrimax"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
    >
      <div className="loader-lockup">
        <div className="loader-spinner" aria-hidden="true">
          {Array.from({ length: 8 }, (_, index) => (
            <div className="loader-dot" key={index} />
          ))}
        </div>
        <div className="loader-name">
          NUTRI<span>MAX</span>
        </div>
        <small>CARREGANDO SUA EXPERIÊNCIA</small>
      </div>
    </motion.div>
  );
}

function App() {
  const reduce = useReducedMotion();
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [goal, setGoal] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.35], [0, reduce ? 0 : 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.25]);

  useEffect(() => {
    const done = () => setLoading(false);

    if (document.readyState === 'complete') {
      requestAnimationFrame(done);
      return;
    }

    window.addEventListener('load', done, { once: true });
    return () => window.removeEventListener('load', done);
  }, []);

  const submitGoal = (event: FormEvent) => {
    event.preventDefault();

    if (!goal) {
      setError('Escolha uma opção para continuar.');
      setResult('');
      return;
    }

    setError('');
    setResult(goals[goal]);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="app">
      <AnimatePresence>{loading && <NutrimaxLoader />}</AnimatePresence>

      <header className="nav">
        <a className="brand" href="#inicio" aria-label="Nutrimax início">
          <span className="brand-mark">N</span>
          <span className={`brand-name ${loading ? '' : 'focus-in-expand'}`}>
            NUTRI<span>MAX</span>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Navegação principal">
          <RevealLink href="#categorias">Categorias</RevealLink>
          <RevealLink href="#experiencia">Experiência</RevealLink>
          <RevealLink href="#parcerias">Parcerias</RevealLink>
          <RevealLink href="#contato">Contato</RevealLink>
        </nav>

        <a className="nav-cta" href="#contato">
          Falar com a Nutrimax <ArrowUpRight size={17} />
        </a>

        <button
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      {menuOpen && (
        <motion.div
          className="mobile-menu"
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <a href="#categorias" onClick={closeMenu}>Categorias</a>
          <a href="#experiencia" onClick={closeMenu}>Experiência</a>
          <a href="#parcerias" onClick={closeMenu}>Parcerias</a>
          <a href="#contato" onClick={closeMenu}>Contato</a>
        </motion.div>
      )}

      <main>
        <section id="inicio" className="hero">
          <img
            className="hero-media"
            src="./resources/topo-site-nutrimax.png"
            alt="Linha de suplementos Nutrimax em destaque"
          />
          <div className="hero-shade" />
          <div className="hero-grid" />

          <motion.div
            className="hero-content"
            style={{ y: heroY, opacity: heroOpacity }}
          >
            <motion.div
              className="eyebrow"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <Sparkles size={15} /> SUPLEMENTAÇÃO • PERFORMANCE • ROTINA
            </motion.div>

            <h1>
              {['SEU RITMO.', 'SUA META.', 'SEU PADRÃO.'].map((line, index) => (
                <span className="line-mask" key={line}>
                  <motion.span
                    initial={{ y: reduce ? 0 : '110%' }}
                    animate={{ y: '0%' }}
                    transition={{
                      duration: 0.8,
                      delay: 0.18 + index * 0.11,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7 }}
            >
              Suplementos selecionados, atendimento próximo e uma experiência
              feita para quem leva evolução a sério.
            </motion.p>

            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85 }}
            >
              <a className="button primary" href="#categorias">
                Explorar categorias <ArrowUpRight size={18} />
              </a>
              <a className="button ghost" href="#contato">Atendimento online</a>
            </motion.div>
          </motion.div>

          <a className="scroll-cue" href="#manifesto">
            DESCER <ChevronDown size={17} />
          </a>
        </section>

        <section id="manifesto" className="manifesto section">
          <span className="section-tag">[ O QUE MOVE A NUTRIMAX ]</span>
          <WordReveal text="Não é sobre comprar qualquer suplemento. É sobre escolher melhor, entender sua rotina e construir constância com produtos que façam sentido para o seu objetivo." />
        </section>

        <section id="categorias" className="section categories">
          <div className="section-head">
            <div>
              <span className="section-tag">[ CATEGORIAS ]</span>
              <h2>O essencial, sem ruído.</h2>
            </div>
            <p>
              Uma seleção organizada para você encontrar o que procura sem precisar
              atravessar um catálogo infinito. A humanidade já sofreu o suficiente
              com menus de 47 páginas.
            </p>
          </div>

          <div className="card-grid">
            {[
              ['01', 'FORÇA', 'Creatina', 'Consistência para rotinas de força e performance.'],
              ['02', 'RECUPERAÇÃO', 'Proteínas', 'Praticidade para complementar a ingestão de proteínas.'],
              ['03', 'ENERGIA', 'Pré-treinos', 'Opções para quem busca intensidade e foco no treino.'],
              ['04', 'ROTINA', 'Vitaminas', 'Suporte nutricional para complementar sua alimentação.'],
            ].map((item, index) => (
              <motion.article
                className="category-card"
                key={item[0]}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                whileHover={reduce ? {} : { y: -8 }}
                transition={{ duration: 0.55, delay: index * 0.06 }}
              >
                <div className="card-top">
                  <span>{item[0]}</span>
                  <ArrowUpRight />
                </div>
                <div className="mini-product"><span>{item[2]}</span></div>
                <div>
                  <small>{item[1]}</small>
                  <h3>{item[2]}</h3>
                  <p>{item[3]}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="experiencia" className="experience section">
          <div className="experience-copy">
            <span className="section-tag">[ EXPERIÊNCIA NUTRIMAX ]</span>
            <h2>Atendimento que começa antes da compra.</h2>
            <p>
              Conte o que você procura e use este atalho para chegar à categoria
              certa. Não substitui orientação profissional, mas evita o clássico
              esporte humano de comprar no impulso e perguntar depois.
            </p>
            <div className="feature-list">
              <span><ShieldCheck /> Curadoria de produtos</span>
              <span><Zap /> Atendimento ágil</span>
              <span><Check /> Compra online em Acopiara</span>
            </div>
          </div>

          <motion.form
            className="goal-card"
            onSubmit={submitGoal}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <span className="goal-kicker">COMECE POR AQUI</span>
            <h3>O que você procura?</h3>

            <div className="goal-options">
              {[
                ['performance', 'Performance e força'],
                ['proteina', 'Proteína e recuperação'],
                ['rotina', 'Rotina e bem-estar'],
                ['duvida', 'Ainda não sei'],
              ].map(([value, label]) => (
                <label key={value} className={goal === value ? 'selected' : ''}>
                  <input
                    type="radio"
                    name="goal"
                    value={value}
                    checked={goal === value}
                    onChange={(event) => setGoal(event.target.value)}
                  />
                  <span>{label}</span>
                  <span className="radio-dot" />
                </label>
              ))}
            </div>

            {error && <p className="form-error" role="alert">{error}</p>}

            <button className="button primary full" type="submit">
              Ver categoria indicada <ArrowUpRight size={18} />
            </button>

            {result && (
              <motion.div
                className="result"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <small>COMECE POR</small>
                <strong>{result}</strong>
              </motion.div>
            )}
          </motion.form>
        </section>

        <section id="parcerias" className="partnership section">
          <div className="partnership-panel">
            <span className="section-tag">[ REDE NUTRIMAX ]</span>
            <h2>Mais perto de quem acompanha sua evolução.</h2>
            <p>
              A Nutrimax fortalece conexões com nutricionistas, personal trainers e
              studios de funcional para criar uma rede local mais próxima e útil.
            </p>

            <div className="ticker" aria-label="Parceiros Nutrimax">
              <motion.div
                className="ticker-track"
                animate={reduce ? {} : { x: ['0%', '-50%'] }}
                transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
              >
                <span>NUTRICIONISTAS ✦ PERSONAL TRAINERS ✦ STUDIOS ✦ CORREDORES ✦ ACADEMIAS ✦ </span>
                <span aria-hidden="true">NUTRICIONISTAS ✦ PERSONAL TRAINERS ✦ STUDIOS ✦ CORREDORES ✦ ACADEMIAS ✦ </span>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="contato" className="contact section">
          <div>
            <span className="section-tag">[ FALE COM A GENTE ]</span>
            <h2>Seu próximo passo pode começar simples.</h2>
          </div>

          <div className="contact-actions">
            <a className="contact-row" href="#inicio">
              <span><MessageCircle /> Atendimento online</span>
              <ArrowUpRight />
            </a>
            <a className="contact-row" href="#inicio">
              <span><Instagram /> Instagram Nutrimax</span>
              <ArrowUpRight />
            </a>
          </div>
        </section>
      </main>

      <footer>
        <a className="brand footer-brand" href="#inicio">
          <span className="brand-mark">N</span>
          <span>NUTRI<span>MAX</span></span>
        </a>
        <p>Suplementação com estratégia. Atendimento online em Acopiara, CE.</p>
        <span>© 2026 NUTRIMAX</span>
      </footer>
    </div>
  );
}

export default App;
