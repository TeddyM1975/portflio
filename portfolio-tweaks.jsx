// portfolio-tweaks.jsx — mounts the Tweaks panel as a small React island
// over the vanilla portfolio. Controls drive CSS variables on :root that
// size the project-card icons, their tiles, and the card width.

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "iconSize": 56,
  "tileSize": 78,
  "cardWidth": 284
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    const r = document.documentElement.style;
    r.setProperty('--picon-size', t.iconSize + '%');
    r.setProperty('--picon-tile', t.tileSize + 'px');
    r.setProperty('--pcard-w', t.cardWidth + 'px');
    // nudge the carousel to recompute centering/focus after a size change
    window.dispatchEvent(new Event('resize'));
  }, [t.iconSize, t.tileSize, t.cardWidth]);

  return (
    <TweaksPanel>
      <TweakSection label="Project cards" />
      <TweakSlider label="Icon size" value={t.iconSize} min={16} max={56} step={1} unit="%"
                   onChange={(v) => setTweak('iconSize', v)} />
      <TweakSlider label="Icon tile" value={t.tileSize} min={78} max={160} step={2} unit="px"
                   onChange={(v) => setTweak('tileSize', v)} />
      <TweakSlider label="Card width" value={t.cardWidth} min={244} max={360} step={2} unit="px"
                   onChange={(v) => setTweak('cardWidth', v)} />
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById('tweaks-root')).render(<App />);
