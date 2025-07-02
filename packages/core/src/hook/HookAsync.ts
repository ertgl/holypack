import type {
  AsyncParallelBailHook,
  AsyncParallelHook,
  AsyncSeriesBailHook,
  AsyncSeriesHook,
  AsyncSeriesLoopHook,
  AsyncSeriesWaterfallHook,
} from "tapable";

export type HookAsync<
  T_Parameters = unknown,
  T_ReturnType = unknown,
> = (
  | AsyncParallelBailHook<T_Parameters, T_ReturnType>
  | AsyncParallelHook<T_Parameters>
  | AsyncSeriesBailHook<T_Parameters, T_ReturnType>
  | AsyncSeriesHook<T_Parameters>
  | AsyncSeriesLoopHook<T_Parameters>
  | AsyncSeriesWaterfallHook<T_Parameters>
);
