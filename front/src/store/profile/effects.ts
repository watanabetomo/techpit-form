import { Dispatch } from "redux";
import profileActions from "./actions";
import { Address } from "../../domain/entity/address";
import {
  isCompletePostalcode,
  sanitizePostalcode
} from "../../domain/services/address";

export const searchAddressFromPostalcode = (code: string) => async (
  dispatch: Dispatch
) => {
  if (!isCompletePostalcode(code)) return;
  const result = await fetch(
    `https://apis.postcode-jp.com/api/v3/postcodes?apikey=wzptgDlEhTcr6OOkTm8l2DdxetzEpbf87uCL3m0&postcode=${sanitizePostalcode(
      code
    )}`
  ).then(res => res.json());

  const address: Partial<Address> = {
    prefecture: result.data[0].pref,
    city: result.data[0].city + result.data[0].town
  };

  dispatch(profileActions.searchAddress.done({result: address, params: {}}));
}