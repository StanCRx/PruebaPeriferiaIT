import React from "react";
import { render, renderHook, RenderOptions } from "@testing-library/react";
import { AllProviders } from "./AllProviders";

export const renderWithProviders = (
  ui: React.ReactElement,
  options?: RenderOptions,
) => render(ui, { wrapper: AllProviders, ...options });

export const renderHookWithProviders = <T,>(hook: () => T) =>
  renderHook(hook, { wrapper: AllProviders });
