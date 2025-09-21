import React from 'react';
import { Link } from 'react-router-dom';
import './Dev.css';

const Dev: React.FC = () => {
  return (
    <div className="dev-page">
      <header className="dev-header">
        <h1 className="dev-title">Dev Playground</h1>
        <p className="dev-subtitle">
          Здесь собраны утилиты для разработки интерфейса и иконок. Используйте эти инструменты, чтобы быстро
          просматривать доступные иконки, их классы и оформление.
        </p>
      </header>

      <section className="dev-section">
        <h2 className="dev-section-title">Иконки и библиотеки</h2>
        <p className="dev-section-desc">
          Ниже доступны два инструмента:
        </p>
        <ul className="dev-list">
          <li>
            <strong>Icons Browser</strong> — просмотр локальных иконок/пиктограмм, примеры использования и CSS-классы.
          </li>
          <li>
            <strong>Devicons Browser</strong> — браузер иконок библиотеки Devicon (технологические логотипы) с поиском и примерами.
          </li>
        </ul>

        <div className="dev-actions">
          <Link to="/dev/icons" className="dev-btn">
            Открыть Icons Browser
          </Link>
          <Link to="/dev/devicons" className="dev-btn secondary">
            Открыть Devicons Browser
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Dev;
