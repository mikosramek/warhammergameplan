import { useEffect } from "react";
import { useAccountStore } from "store/account";
import { useArmiesStore } from "store/armies";
import { useApi } from "./useApi";
import { useLog } from "./useLog";

const useArmies = () => {
  const { getters } = useApi();
  const { log, error } = useLog();
  const setArmies = useArmiesStore((state) => state.setArmies);
  const updateArmySteps = useArmiesStore((state) => state.updateArmySteps);
  const armies = useArmiesStore((state) => state.armies);
  const armiesFetched = useArmiesStore((state) => state.armiesFetched);
  const isLoggedIn = useAccountStore((state) => state.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn && !armiesFetched) {
      handleArmiesFetch();
    }
  }, [isLoggedIn]);

  const handleArmiesFetch = async () => {
    log("FETCHING ARMIES");
    try {
      const armies = await getters.getArmies();
      if (!(armies instanceof Error)) {
        setArmies(armies);
      }
    } catch (e) {
      error(e);
    }
  };

  const handleArmyFetch = async (id: string) => {
    log("FETCHING SINGULAR ARMY", id);
    try {
      const steps = await getters.getArmySteps(id);
      if (steps && !(steps instanceof Error)) {
        log(steps);
        updateArmySteps(id, steps);
      }
    } catch (e) {
      error(e);
    }
  };

  return { armies, armiesFetched, handleArmyFetch };
};

export default useArmies;
