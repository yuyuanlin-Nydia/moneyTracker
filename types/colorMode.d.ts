export interface ColorModeInstance {
  preference: string;
  value: string;
  unknown: boolean;
  forced: boolean;
}

declare module '#app' {
interface NuxtApp {
  $colorMode: ColorModeInstance
}
}

declare module '@vue/runtime-core' {
interface ComponentCustomProperties {
  $colorMode: ColorModeInstance
}
}

export { }