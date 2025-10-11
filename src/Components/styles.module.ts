import styled from "styled-components";

export const MainWrapper = styled.div`
  height: 100vh;
  background: linear-gradient(135deg, #74ebd5, #acb6e5);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Inter', sans-serif;

  .container {
    background-color: rgba(255, 255, 255, 0.85);
    border-radius: 20px;
    padding: 3rem;
    width: 400px;
    max-width: 90%;
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .searchArea {
    display: flex;
    width: 100%;
    margin-bottom: 30px;
  }

  .searchArea > input {
    flex: 1;
    padding: 12px 15px;
    border-radius: 30px 0 0 30px;
    border: none;
    outline: none;
    font-size: 16px;
    border: 1px solid #ccc;
    transition: all 0.3s ease;
  }

  .searchArea > input:focus {
    border-color: #3498db;
    box-shadow: 0 0 5px rgba(52, 152, 219, 0.5);
  }

  .searchCircle {
    background-color: #3498db;
    border-radius: 0 30px 30px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .searchCircle:hover {
    background-color: #2980b9;
  }

  .searchIcon {
    color: #fff;
    font-size: 24px;
  }

  .weatherArea {
    text-align: center;
    margin-bottom: 30px;

    .icon {
      font-size: 80px;
      margin: 10px 0;
    }

    h1 {
      font-size: 2.8rem;
      margin: 5px 0;
    }

    span {
      font-size: 1.2rem;
      color: #555;
    }

    h2 {
      font-size: 1.5rem;
      font-weight: 500;
      margin-top: 5px;
      color: #333;
    }
  }

  .bottomInfoArea {
    display: flex;
    justify-content: space-around;
    width: 100%;
    padding: 15px 0;
    background: linear-gradient(90deg, #ffffff, #f0f0f0);
    border-radius: 15px;

    .humidityLevel, .wind {
      display: flex;
      align-items: center;

      .humidInfo {
        margin-left: 10px;
        h1 {
          font-size: 1.4rem;
          margin: 0;
        }
        p {
          margin: 0;
          font-size: 0.9rem;
          color: #555;
        }
      }
    }

    .windIcon {
      font-size: 2rem;
      color: #3498db;
    }
  }

  .loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .loader {
      font-size: 48px;
      animation: spin 2s linear infinite;
      color: #3498db;
    }

    h2 {
      margin-top: 15px;
      color: #333;
    }
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;
