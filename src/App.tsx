import { ConfigProvider } from "antd";
import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { appTheme } from "./theme";
import AppHeader from "./components/AppHeader";
import SyncCodeGate from "./components/SyncCodeGate";
import TrackSelect from "./components/TrackSelect";
import ChineseApp from "./components/chinese/ChineseApp";
import EnglishApp from "./components/english/EnglishApp";
import JapaneseApp from "./components/japanese/JapaneseApp";
import { signOutAccount } from "./utils/account";
import {
  getLearningTrack,
  setLearningTrack,
  type LearningTrack,
} from "./utils/learningTrack";
import {
  clearSyncCode,
  getSyncCode,
  getSyncLabel,
  setSyncCode,
} from "./utils/syncCode";

function App() {
  const [track, setTrackState] = useState<LearningTrack | null>(() =>
    getLearningTrack(),
  );
  const [syncCode, setSyncCodeState] = useState<string | null>(() =>
    getSyncCode(),
  );
  const [syncLabel, setSyncLabelState] = useState<string | null>(() =>
    getSyncLabel(),
  );

  const changeTrack = (next: LearningTrack) => {
    setLearningTrack(next);
    setTrackState(next);
  };

  const switchAccount = () => {
    clearSyncCode();
    setSyncCodeState(null);
    setSyncLabelState(null);
    void signOutAccount();
  };

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ConfigProvider theme={appTheme}>
        <AppHeader
          track={track}
          onChangeTrack={changeTrack}
          account={
            track && syncCode
              ? { name: syncLabel ?? syncCode, onSwitch: switchAccount }
              : null
          }
        />
        {!track ? (
          <TrackSelect onSelect={changeTrack} />
        ) : !syncCode ? (
          <SyncCodeGate
            onSubmit={(code, label) => {
              setSyncCode(code, label);
              setSyncCodeState(code);
              setSyncLabelState(label ?? null);
            }}
          />
        ) : track === "japanese" ? (
          <JapaneseApp syncCode={syncCode} />
        ) : track === "chinese" ? (
          <ChineseApp syncCode={syncCode} />
        ) : (
          <EnglishApp syncCode={syncCode} />
        )}
      </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;
