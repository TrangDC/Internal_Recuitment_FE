import PopupContext from "contexts/popupProvider";
import { useContext } from "react";

const usePopup = () => useContext(PopupContext);

export default usePopup;
