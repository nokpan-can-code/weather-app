import styled, { keyframes } from "styled-components";

// Beautiful micro-animations for high-fidelity interactive feel
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { transform: scale(1); opacity: 0.9; }
  50% { transform: scale(1.05); opacity: 1; }
  100% { transform: scale(1); opacity: 0.9; }
`;

const spinSlow = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const slideUp = keyframes`
  from { transform: translateY(15px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

export const MainWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Plus Jakarta Sans', sans-serif;
  padding: 2rem 1rem;
  box-sizing: border-box;
  transition: background-color 0.8s cubic-bezier(0.16, 1, 0.3, 1);

  /* Solid background transitions based on weather condition (Light Mode) */
  &.light-mode.weather-clear { background-color: #FFF9E6; }
  &.light-mode.weather-clouds { background-color: #F1F3F6; }
  &.light-mode.weather-rain { background-color: #E8EEF5; }
  &.light-mode.weather-snow { background-color: #F0FAF8; }
  &.light-mode.weather-mist { background-color: #EDF2EE; }
  &.light-mode.weather-default { background-color: #F9FAFB; }

  /* Solid background transitions based on weather condition (Dark Mode) */
  &.dark-mode.weather-clear { background-color: #1A150D; }
  &.dark-mode.weather-clouds { background-color: #121418; }
  &.dark-mode.weather-rain { background-color: #0E1218; }
  &.dark-mode.weather-snow { background-color: #0D1616; }
  &.dark-mode.weather-mist { background-color: #0E1310; }
  &.dark-mode.weather-default { background-color: #0B0E14; }

  /* Smooth dark/light global theme transitions */
  transition: background-color 0.8s cubic-bezier(0.16, 1, 0.3, 1);

  .container {
    background-color: #ffffff;
    border: 1.5px solid #18181B;
    border-radius: 24px;
    padding: 2.2rem;
    width: 440px;
    max-width: 100%;
    box-shadow: 6px 6px 0px #18181B;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    animation: ${slideUp} 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }

  &.dark-mode .container {
    background-color: #18181B;
    border-color: #3F3F46;
    box-shadow: 6px 6px 0px #000000;
  }

  /* Header controls */
  .headerControls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 1.8rem;
  }

  .themeToggleBtn {
    background: none;
    border: 1.5px solid #18181B;
    border-radius: 12px;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 1.1rem;
    color: #18181B;
    transition: all 0.2s ease;

    &:hover {
      background-color: #F4F4F5;
      transform: translateY(-2px);
    }
  }

  &.dark-mode .themeToggleBtn {
    border-color: #3F3F46;
    color: #F4F4F5;
    &:hover {
      background-color: #27272A;
    }
  }

  .unitToggleContainer {
    display: flex;
    border: 1.5px solid #18181B;
    border-radius: 12px;
    overflow: hidden;
    background-color: #ffffff;
  }

  &.dark-mode .unitToggleContainer {
    border-color: #3F3F46;
    background-color: #18181B;
  }

  .unitBtn {
    background: none;
    border: none;
    padding: 0.5rem 0.8rem;
    font-family: 'Outfit', sans-serif;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    color: #71717A;
    transition: all 0.2s ease;

    &.active {
      background-color: #18181B;
      color: #ffffff;
    }
  }

  &.dark-mode .unitBtn {
    color: #A1A1AA;
    &.active {
      background-color: #3F3F46;
      color: #ffffff;
    }
  }

  /* Search Area */
  .searchArea {
    display: flex;
    width: 100%;
    gap: 0.75rem;
    margin-bottom: 0.8rem;
  }

  .inputWrapper {
    flex: 1;
    position: relative;
    display: flex;
    align-items: center;
  }

  .searchIcon {
    position: absolute;
    left: 14px;
    color: #71717A;
    pointer-events: none;
  }

  &.dark-mode .searchIcon {
    color: #A1A1AA;
  }

  .inputWrapper > input {
    width: 100%;
    padding: 12px 14px 12px 42px;
    border-radius: 14px;
    border: 1.5px solid #18181B;
    outline: none;
    font-size: 0.95rem;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-weight: 500;
    background-color: #ffffff;
    color: #18181B;
    transition: all 0.2s ease;

    &::placeholder {
      color: #A1A1AA;
    }

    &:focus {
      border-color: #2563EB;
      box-shadow: 3px 3px 0px rgba(37, 99, 235, 0.1);
    }
  }

  &.dark-mode .inputWrapper > input {
    border-color: #3F3F46;
    background-color: #27272A;
    color: #F4F4F5;

    &:focus {
      border-color: #3B82F6;
      box-shadow: 3px 3px 0px rgba(59, 130, 246, 0.15);
    }
  }

  .searchButton {
    background-color: #18181B;
    color: #ffffff;
    border: 1.5px solid #18181B;
    border-radius: 14px;
    padding: 0 1.2rem;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background-color: #27272A;
      transform: translateY(-1px);
    }

    &:active {
      transform: translateY(1px);
    }
  }

  &.dark-mode .searchButton {
    background-color: #F4F4F5;
    color: #18181B;
    border-color: #F4F4F5;

    &:hover {
      background-color: #E4E4E7;
    }
  }

  /* Preset Pills */
  .presetsArea {
    display: flex;
    width: 100%;
    gap: 0.5rem;
    margin-bottom: 1.8rem;
    flex-wrap: wrap;
  }

  .presetBtn {
    background-color: #F4F4F5;
    border: 1px solid #E4E4E7;
    border-radius: 8px;
    padding: 0.4rem 0.75rem;
    font-size: 0.8rem;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-weight: 500;
    color: #52525B;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background-color: #18181B;
      border-color: #18181B;
      color: #ffffff;
      transform: translateY(-1.5px);
    }
  }

  &.dark-mode .presetBtn {
    background-color: #27272A;
    border-color: #3F3F46;
    color: #D4D4D8;

    &:hover {
      background-color: #F4F4F5;
      border-color: #F4F4F5;
      color: #18181B;
    }
  }

  /* Weather Display Section */
  .weatherArea {
    text-align: center;
    width: 100%;
    margin-bottom: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    .locationHeader {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.2rem;
      margin-bottom: 1rem;
    }

    .cityName {
      font-size: 2.2rem;
      font-weight: 800;
      font-family: 'Outfit', sans-serif;
      color: #18181B;
      margin: 0;
      letter-spacing: -0.5px;
    }

    .countryBadge {
      font-size: 0.75rem;
      font-weight: 700;
      background-color: #E4E4E7;
      color: #3F3F46;
      padding: 0.2rem 0.6rem;
      border-radius: 6px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .iconContainer {
      height: 110px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 0.8rem;
    }

    .weatherIconSpan {
      font-size: 84px;
      display: flex;
      justify-content: center;
      align-items: center;
      animation: ${float} 4s ease-in-out infinite;

      &.sunny {
        animation: ${float} 4s ease-in-out infinite, ${spinSlow} 25s linear infinite;
      }
      
      &.cloudy {
        animation: ${float} 5s ease-in-out infinite;
      }

      &.rainy {
        animation: ${pulse} 3s ease-in-out infinite;
      }
    }

    .tempContainer {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.1rem;
    }

    .temperature {
      font-size: 4rem;
      font-family: 'Outfit', sans-serif;
      font-weight: 800;
      color: #18181B;
      margin: 0;
      line-height: 1;
      display: flex;
      align-items: flex-start;
      letter-spacing: -1.5px;

      .tempUnit {
        font-size: 1.8rem;
        font-weight: 500;
        margin-top: 0.3rem;
        margin-left: 0.1rem;
        color: #71717A;
      }
    }

    .weatherDesc {
      font-size: 1.15rem;
      font-weight: 600;
      color: #52525B;
      margin-top: 0.4rem;
      text-transform: capitalize;
    }
  }

  &.dark-mode {
    .cityName { color: #F4F4F5; }
    .countryBadge { background-color: #27272A; color: #D4D4D8; }
    .temperature { color: #F4F4F5; .tempUnit { color: #A1A1AA; } }
    .weatherDesc { color: #A1A1AA; }
  }

  /* Grid Area (2x2 Flat Panels) */
  .weatherGrid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.8rem;
    width: 100%;
  }

  .gridItem {
    background-color: #F9FAFB;
    border: 1.5px solid #18181B;
    border-radius: 16px;
    padding: 0.95rem 0.85rem;
    display: flex;
    align-items: center;
    gap: 0.65rem;
    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 3px 3px 0px #18181B;
    }
  }

  &.dark-mode .gridItem {
    background-color: #27272A;
    border-color: #3F3F46;

    &:hover {
      box-shadow: 3px 3px 0px #000000;
    }
  }

  .gridIcon {
    font-size: 1.6rem;
    flex-shrink: 0;

    &.humidity { color: #3B82F6; }
    &.wind { color: #10B981; }
    &.feelsLike { color: #EF4444; }
    &.pressure { color: #8B5CF6; }
  }

  .itemInfo {
    display: flex;
    flex-direction: column;

    .label {
      font-size: 0.75rem;
      font-weight: 500;
      color: #71717A;
    }

    .value {
      font-size: 0.95rem;
      font-family: 'Outfit', sans-serif;
      font-weight: 700;
      color: #18181B;
    }
  }

  &.dark-mode .itemInfo {
    .label { color: #A1A1AA; }
    .value { color: #F4F4F5; }
  }

  /* Loading State */
  .loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem 0;
    width: 100%;

    .loader {
      font-size: 40px;
      animation: ${spinSlow} 1.2s linear infinite;
      color: #2563EB;
      margin-bottom: 1rem;
    }

    h2 {
      font-size: 1.1rem;
      font-weight: 600;
      color: #52525B;
    }
  }

  &.dark-mode .loading {
    .loader { color: #3B82F6; }
    h2 { color: #A1A1AA; }
  }

  /* Redesigned High-Fidelity Error Cards (Amber/Red Accents depending on type) */
  .errorArea {
    display: flex;
    flex-direction: column;
    text-align: left;
    padding: 1.5rem;
    width: 100%;
    box-sizing: border-box;
    border-radius: 18px;
    margin-top: 0.5rem;
    animation: ${slideUp} 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    
    /* Dynamic solid border styles */
    border: 1.5px solid #EF4444; 
    background-color: #FEF2F2; 
    box-shadow: 4px 4px 0px #EF4444;

    &.error-429 {
      border-color: #D97706; /* Amber border */
      background-color: #FFFBEB; /* Amber cream solid background */
      box-shadow: 4px 4px 0px #D97706;
    }

    &.error-401 {
      border-color: #7C3AED; /* Purple auth border */
      background-color: #F5F3FF; /* Purple cream */
      box-shadow: 4px 4px 0px #7C3AED;
    }

    .errorHeaderRow {
      display: flex;
      align-items: center;
      gap: 0.65rem;
      margin-bottom: 0.65rem;
    }

    .errorHeaderIcon {
      font-size: 1.6rem;
      color: #DC2626;
    }

    &.error-429 .errorHeaderIcon { color: #D97706; }
    &.error-401 .errorHeaderIcon { color: #7C3AED; }

    h2 {
      font-size: 1.15rem;
      font-weight: 800;
      font-family: 'Outfit', sans-serif;
      color: #991B1B;
      margin: 0;
      letter-spacing: -0.2px;
    }

    &.error-429 h2 { color: #92400E; }
    &.error-401 h2 { color: #5B21B6; }

    .errorMsgText {
      font-size: 0.88rem;
      font-weight: 500;
      color: #B91C1C;
      line-height: 1.45;
      margin-bottom: 0.95rem;
    }

    &.error-429 .errorMsgText { color: #B45309; }
    &.error-401 .errorMsgText { color: #6D28D9; }

    .errorDivider {
      height: 1px;
      background-color: rgba(239, 68, 68, 0.15);
      width: 100%;
      margin-bottom: 0.95rem;
    }

    &.error-429 .errorDivider { background-color: rgba(217, 119, 6, 0.15); }
    &.error-401 .errorDivider { background-color: rgba(124, 58, 237, 0.15); }

    .troubleLabel {
      font-size: 0.72rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.6px;
      color: #7F1D1D;
      margin-bottom: 0.4rem;
    }

    &.error-429 .troubleLabel { color: #78350F; }
    &.error-401 .troubleLabel { color: #4C1D95; }

    .troubleList {
      list-style: none;
      padding: 0;
      margin: 0 0 1.2rem 0;
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }

    .troubleItem {
      font-size: 0.8rem;
      font-weight: 500;
      line-height: 1.4;
      color: #991B1B;
      display: flex;
      align-items: flex-start;
      gap: 0.45rem;

      &:before {
        content: "•";
        color: #EF4444;
        font-weight: bold;
        flex-shrink: 0;
      }
    }

    &.error-429 .troubleItem {
      color: #92400E;
      &:before { color: #D97706; }
    }

    &.error-401 .troubleItem {
      color: #5B21B6;
      &:before { color: #7C3AED; }
    }

    .errorResetBtn {
      align-self: flex-start;
      background-color: #18181B;
      color: #ffffff;
      border: 1.5px solid #18181B;
      padding: 0.45rem 1rem;
      border-radius: 10px;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-weight: 700;
      font-size: 0.8rem;
      cursor: pointer;
      box-shadow: 2px 2px 0px rgba(0,0,0,0.15);
      transition: all 0.2s ease;

      &:hover {
        background-color: #27272A;
        transform: translateY(-1.5px);
      }

      &:active {
        transform: translateY(1.5px);
      }
    }

    &.error-429 .errorResetBtn {
      background-color: #D97706;
      border-color: #D97706;
      color: #ffffff;
      &:hover { background-color: #B45309; border-color: #B45309; }
    }

    &.error-401 .errorResetBtn {
      background-color: #7C3AED;
      border-color: #7C3AED;
      color: #ffffff;
      &:hover { background-color: #6D28D9; border-color: #6D28D9; }
    }
  }

  &.dark-mode .errorArea {
    background-color: #1A1212;
    border-color: #F87171;
    box-shadow: 4px 4px 0px #F87171;

    &.error-429 {
      background-color: #1A1612;
      border-color: #F59E0B;
      box-shadow: 4px 4px 0px #F59E0B;
    }

    &.error-401 {
      background-color: #13111A;
      border-color: #A78BFA;
      box-shadow: 4px 4px 0px #A78BFA;
    }

    h2 { color: #FECACA; }
    &.error-429 h2 { color: #FEF3C7; }
    &.error-401 h2 { color: #E9D5FF; }

    .errorMsgText { color: #FCA5A5; }
    &.error-429 .errorMsgText { color: #FCD34D; }
    &.error-401 .errorMsgText { color: #DDD6FE; }

    .troubleLabel { color: #FCA5A5; }
    &.error-429 .troubleLabel { color: #FCD34D; }
    &.error-401 .troubleLabel { color: #DDD6FE; }

    .troubleItem {
      color: #FCA5A5;
      &:before { color: #F87171; }
    }
    &.error-429 .troubleItem {
      color: #FCD34D;
      &:before { color: #F59E0B; }
    }
    &.error-401 .troubleItem {
      color: #DDD6FE;
      &:before { color: #A78BFA; }
    }

    .errorResetBtn {
      background-color: #F4F4F5;
      color: #18181B;
      border-color: #F4F4F5;
      &:hover { background-color: #E4E4E7; }
    }
  }

  .noData {
    padding: 3rem 0;
    text-align: center;
    color: #71717A;
    font-weight: 600;
  }

  &.dark-mode .noData {
    color: #A1A1AA;
  }
`;
