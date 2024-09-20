import { BackButton } from "@twa-dev/sdk/react";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import CloseIcon from "public/icons/close.svg";
import TapplyText from "./components/tapply-text";

const TapplyCoinPage: FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <BackButton onClick={() => navigate(-1)} />
      <div className="flex justify-end py-2 pr-8">
        <button className="outline-none" onClick={() => navigate(-1)}>
          <CloseIcon />
        </button>
      </div>
      <div className="my-4 h-[167px] w-full bg-tapply-coin bg-cover" />
      <TapplyText />
    </div>
  );
};

export default TapplyCoinPage;
