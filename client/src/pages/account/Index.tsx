import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PROFILE, ORDERS, SAVED, buttonStyle, profileActiveStyle, orderActiveStyle, savedActiveStyle } from "../../lib/account-page";
import { Profile } from "@/components/account/tab-profile";
import { Orders } from "@/components/account/tab-orders";
import { Saved } from "@/components/account/tab-saved";

const Account = () => {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const p = useParams();

  const [tab, setTab] = useState<string>(PROFILE);
  const isProfile = tab === PROFILE;
  const isOrders = tab === ORDERS;
  const isSaved = tab === SAVED;

  useEffect(() => {
    const tab = params.get("tab");
    if (!tab) return
    if (tab === PROFILE) return setTab(PROFILE);
    if (tab === ORDERS) return setTab(ORDERS);
    if (tab === SAVED) return setTab(SAVED);
    navigate(`/account?tab=${PROFILE}`);
  }, [p]);

  const handleBtnClick = (tab: string) => {
    setTab(tab);
    navigate(`/account?tab=${tab}`);
  }

  return (
    <div className="flex-[1] flex flex-col p-8 bg-neutral-50 dark:bg-neutral-900">
      <div id="account-tab-triggers">
        <div className="w-fit grid grid-cols-3 bg-white dark:bg-neutral-800 border border-b-0 border-neutral-400/50 dark:border-neutral-600 rounded-t-xl overflow-hidden">
          <button className={(isProfile ? profileActiveStyle : buttonStyle) + " rounded-tl-xl"} onClick={() => handleBtnClick(PROFILE)}>
            Profile
          </button>
          <button className={(isOrders ? orderActiveStyle : buttonStyle)} onClick={() => handleBtnClick(ORDERS)}>
            Orders
          </button>
          <button className={(isSaved ? savedActiveStyle : buttonStyle) + " rounded-tr-xl"} onClick={() => handleBtnClick(SAVED)}>
            Saved
          </button>
        </div>
      </div>

      <div id="account-tab-contents">
        <div className="w-full h-full bg-white dark:bg-neutral-800/50 border border-neutral-400/50 dark:border-neutral-600 rounded-xl rounded-tl-none overflow-hidden p-8">
          <div className={isProfile ? "flex" : "hidden"}>
            <Profile />
          </div>
          <div className={isOrders ? "flex" : "hidden"}>
            <Orders />
          </div>
          <div className={isSaved ? "flex" : "hidden"}>
            <Saved />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Account