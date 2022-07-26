import React from "react";
import setting from "../assets/icons/svg/settings.svg";
import database from "../assets/icons/svg/database.svg";
import panel from "../assets/icons/svg/panel.svg";
import language from "../assets/icons/svg/language.svg";
import { Link } from "react-router-dom";

const SettingsCard = () => {
  return (
    <div className="bg-white pb-4" style={{ borderRadius: "10px" }}>
      <h6 className="pt-4 px-3">Settings</h6>
      <hr className="my-0" />
      <div className="links py-3 bord">
        <Link to="/settings" className="mx-3">
          <img src={setting} alt="" width={25} />
          <span className="gray-text mx-2">General Settings</span>
        </Link>
      </div>
      <div className="links py-3 bord">
        <Link to="/settings/import-database" className="mx-3">
          <img src={database} alt="" width={25} />
          <span className="gray-text mx-2">Import Database</span>
        </Link>
      </div>
      <div className="links py-3 bord">
        <Link to="/settings/panel-settings" className="mx-3">
          <img src={panel} alt="" width={25} />
          <span className="gray-text mx-2">Panel Settings</span>
        </Link>
      </div>
      <div className="links py-3 bord">
        <Link to="/settings/language-settings" className="mx-3">
          <img src={language} alt="" width={25} />
          <span className="gray-text mx-2">Language</span>
        </Link>
      </div>
    </div>
  );
};

export default SettingsCard;
