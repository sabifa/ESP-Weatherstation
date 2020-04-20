// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable import/no-cycle */
// import { createModule } from 'direct-vuex';
// import { moduleActionContext } from './index';

// export type UserSettingsState = {
//   brightness: number;
//   displayLeft: string;
//   displayRight: string;
// }

// const userSettings = createModule({
//   state: (): UserSettingsState => ({
//     brightness: 11,
//     displayLeft: 'Speed',
//     displayRight: 'FuelLevel',
//   }),
//   mutations: {
//     SET_BRIGHTNESS(state, brightness: number): void {
//       state.brightness = brightness;
//     },
//     SET_DISPLAY_LEFT(state, value: string): void {
//       state.displayLeft = value;
//     },
//     SET_DISPLAY_RIGHT(state, value: string): void {
//       state.displayRight = value;
//     },
//   },
//   actions: {
//     // loadP1(context, payload: { id: string }) {
//     //   const {
//     //     dispatch, commit, getters, state,
//     //   } = mod1ActionContext(context);
//     //   // Here, 'dispatch', 'commit', 'getters' and 'state' are typed.
//     // },
//   },
// });

// export default userSettings;
// export const mod1ActionContext = (context: any): any => moduleActionContext(context, userSettings);
