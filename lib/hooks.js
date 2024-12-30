import * as reactRedux from "react-redux";

export const useDispatch = reactRedux.useDispatch.withTypes();
export const useSelector = reactRedux.useSelector.withTypes();
export const useStore = reactRedux.useStore.withTypes();
