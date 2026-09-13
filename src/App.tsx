import { ConfigProvider, theme } from "antd";
import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import LanguageSwitcher from "./components/LanguageSwitcher";
import SyncCodeGate from "./components/SyncCodeGate";
import TrackSelect from "./components/TrackSelect";
import TrackSwitcher from "./components/TrackSwitcher";
import EnglishApp from "./components/english/EnglishApp";
import JapaneseApp from "./components/japanese/JapaneseApp";
import { signOutAccount } from "./utils/account";
import { clearSyncCode, getSyncCode, getSyncLabel, setSyncCode } from "./utils/syncCode";
import {
  clearLearningTrack,
  getLearningTrack,
  setLearningTrack,
  type LearningTrack,
} from "./utils/learningTrack";

const baseTheme = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: "#7aa7d9",
    fontFamily: "'Segoe UI', system-ui, -apple-system, 'Helvetica Neue', sans-serif",
    borderRadius: 12,
  },
};

function App() {
  const [track, setTrackState] = useState<LearningTrack | null>(() => getLearningTrack());
  const [syncCode, setSyncCodeState] = useState<string | null>(() => getSyncCode());
  const [syncLabel, setSyncLabelState] = useState<string | null>(() => getSyncLabel());

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <LanguageSwitcher />
      {track && (
        <TrackSwitcher
          track={track}
          onSwitch={() => {
            clearLearningTrack();
            setTrackState(null);
          }}
        />
      )}
      {!track ? (
        <ConfigProvider theme={baseTheme}>
          <TrackSelect
            onSelect={(selected) => {
              setLearningTrack(selected);
              setTrackState(selected);
            }}
          />
        </ConfigProvider>
      ) : !syncCode ? (
        <ConfigProvider theme={baseTheme}>
          <SyncCodeGate
            onSubmit={(code, label) => {
              setSyncCode(code, label);
              setSyncCodeState(code);
              setSyncLabelState(label ?? null);
            }}
          />
        </ConfigProvider>
      ) : track === "japanese" ? (
        <JapaneseApp
          syncCode={syncCode}
          displayName={syncLabel ?? syncCode}
          onSwitchAccount={() => {
            clearSyncCode();
            setSyncCodeState(null);
            setSyncLabelState(null);
            void signOutAccount();
          }}
        />
      ) : (
        <EnglishApp
          syncCode={syncCode}
          displayName={syncLabel ?? syncCode}
          onSwitchAccount={() => {
            clearSyncCode();
            setSyncCodeState(null);
            setSyncLabelState(null);
            void signOutAccount();
          }}
        />
      )}
    </BrowserRouter>
  );
}

export default App;
