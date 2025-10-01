import React, { useMemo, useState } from "react";
import "./style.css";

const roundPresets = [3, 10, 25, 100, 200, 500];

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

function NumberStepper({ value, step = 0.01, min = 0, max = 999999, onChange, disabled }) {
  const formatted = useMemo(() => Number(value).toFixed(2), [value]);

  return (
    <div className={`ab-stepper${disabled ? " is-disabled" : ""}`}>
      <button
        type="button"
        className="ab-stepper__btn"
        onClick={() => !disabled && onChange(clamp(Number(value) - step, min, max))}
        aria-label="decrease"
      >
        −
      </button>
      <div className="ab-stepper__value">{formatted}</div>
      <button
        type="button"
        className="ab-stepper__btn"
        onClick={() => !disabled && onChange(clamp(Number(value) + step, min, max))}
        aria-label="increase"
      >
        +
      </button>
    </div>
  );
}

function Toggle({ checked, onChange, label }) {
  return (
    <label className="ab-toggle">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span className="ab-toggle__slider" />
      <span className="ab-toggle__label">{label}</span>
    </label>
  );
}

function RadioPill({ active, children, onClick }) {
  return (
    <button type="button" className={`ab-pill${active ? " is-active" : ""}`} onClick={onClick}>
      <span className={`ab-dot${active ? " is-on" : ""}`} />
      <span className="ab-pill__text">{children}</span>
    </button>
  );
}

function PercentageControl({ prefix, value, onChange, active, onActivate }) {
  return (
    <div className="ab-percent">
      <button type="button" className={`ab-radio${active ? " is-on" : ""}`} onClick={onActivate} />
      <div className="ab-percent__label">{prefix}</div>
      <div className="ab-percent__stepper">
        <button type="button" className="ab-stepper__btn" onClick={() => onChange(clamp(value - 1, 0, 100))}>−</button>
        <div className="ab-percent__value">{value}%</div>
        <button type="button" className="ab-stepper__btn" onClick={() => onChange(clamp(value + 1, 0, 100))}>+</button>
      </div>
    </div>
  );
}

export default function AutoBetting({ open = true, onClose }) {
  const [target, setTarget] = useState(2);
  const [rounds, setRounds] = useState(3);

  const [stopOnDecrease, setStopOnDecrease] = useState(false);
  const [decreaseAmount, setDecreaseAmount] = useState(0);

  const [stopOnSingleWin, setStopOnSingleWin] = useState(false);
  const [singleWinAmount, setSingleWinAmount] = useState(0);

  const [moreOpen, setMoreOpen] = useState(false);

  const [stopOnIncrease, setStopOnIncrease] = useState(false);
  const [increaseAmount, setIncreaseAmount] = useState(0);

  const lossModes = ["Return to initial bet", "Increase bet by", "Decrease bet by"];
  const winModes = ["Return to initial bet", "Increase bet by", "Decrease bet by"];
  const [lossMode, setLossMode] = useState(lossModes[0]);
  const [winMode, setWinMode] = useState(winModes[0]);
  const [lossPercent, setLossPercent] = useState(0);
  const [winPercent, setWinPercent] = useState(0);

  if (!open) return null;

  return (
    <div className="ab-modal">
      <div className="ab-card">
        <div className="ab-card__header">
          <div className="ab-card__title">AUTO PLAY</div>
          <button type="button" className="ab-close" onClick={onClose} aria-label="close">×</button>
        </div>

        <div className="ab-section">
          <div className="ab-row ab-row--between">
            <div className="ab-label">Target</div>
            <NumberStepper value={target} step={0.01} min={1} max={1000} onChange={setTarget} />
          </div>
        </div>

        <div className="ab-section">
          <div className="ab-subtitle">Number of rounds</div>
          <div className="ab-grid">
            {roundPresets.map((r) => (
              <RadioPill key={r} active={rounds === r} onClick={() => setRounds(r)}>
                {r}
              </RadioPill>
            ))}
          </div>
        </div>

        <div className="ab-section">
          <div className="ab-row ab-row--between">
            <Toggle checked={stopOnDecrease} onChange={setStopOnDecrease} label="Stop if cash decreases by" />
            <NumberStepper value={decreaseAmount} step={0.5} min={0} max={999999} onChange={setDecreaseAmount} disabled={!stopOnDecrease} />
          </div>
        </div>

        <div className="ab-section">
          <div className="ab-row ab-row--between">
            <Toggle checked={stopOnSingleWin} onChange={setStopOnSingleWin} label="Stop if single win exceeds" />
            <NumberStepper value={singleWinAmount} step={0.5} min={0} max={999999} onChange={setSingleWinAmount} disabled={!stopOnSingleWin} />
          </div>
        </div>

        <div className="ab-section">
          <button type="button" className="ab-more" onClick={() => setMoreOpen((v) => !v)}>
            More options {moreOpen ? "▴" : "▾"}
          </button>
        </div>

        {moreOpen && (
          <div className="ab-more-panel">
            <div className="ab-section">
              <div className="ab-row ab-row--between">
                <Toggle checked={stopOnIncrease} onChange={setStopOnIncrease} label="Stop if cash increases by" />
                <NumberStepper value={increaseAmount} step={0.5} min={0} max={999999} onChange={setIncreaseAmount} disabled={!stopOnIncrease} />
              </div>
            </div>

            <div className="ab-section">
              <div className="bet-control-panel">
                <div className="bet-control-panel-title">If I lost</div>
                <div className="bet-control-panel-header">
                  <div className="circle"></div>
                  <div className="content">Return to initial bet</div>
                </div>
                <div className="bet-control-panel-body">
                  <div className="bet-control-panel-body-left">
                    <div className="circle"></div>
                    <div className="increase-block">
                      <h6>Increase bet by</h6>
                      <div className="tool">
                        <button className="minus-btn">-</button>
                        <input value={`${0}%`} />
                        <button className="plus-btn">+</button>
                      </div>
                    </div>
                  </div>
                  <div className="bet-control-panel-body-right">
                    <div className="circle"></div>
                    <div className="increase-block">
                      <h6>Decrease bet by</h6>
                      <div className="tool">
                        <button className="minus-btn">-</button>
                        <input value={`${0}%`} />
                        <button className="plus-btn">+</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="ab-section">
              <div className="bet-control-panel">
                <div className="bet-control-panel-title">If I win</div>
                <div className="bet-control-panel-header">
                  <div className="circle"></div>
                  <div className="content">Return to initial bet</div>
                </div>
                <div className="bet-control-panel-body">
                  <div className="bet-control-panel-body-left">
                    <div className="circle"></div>
                    <div className="increase-block">
                      <h6>Increase bet by</h6>
                      <div className="tool">
                        <button className="minus-btn">-</button>
                        <input value={`${0}%`} />
                        <button className="plus-btn">+</button>
                      </div>
                    </div>
                  </div>
                  <div className="bet-control-panel-body-right">
                    <div className="circle"></div>
                    <div className="increase-block">
                      <h6>Decrease bet by</h6>
                      <div className="tool">
                        <button className="minus-btn">-</button>
                        <input value={`${0}%`} />
                        <button className="plus-btn">+</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        <div className="ab-footer">
          <button type="button" className="ab-start">START AUTO</button>
        </div>
      </div>
    </div>
  );
}


// export default AutoBetting;