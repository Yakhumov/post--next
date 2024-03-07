import React from "react";
import { Input, Button } from "antd";

const HomePage: React.FC = () => {
  return (
    <div>
        <h1 style={{ marginTop: "30px" }}>Список постов</h1>
      <div className="header">
        <div className="input">
          <Input placeholder="Введите название" allowClear size="large" />
        </div>
        <div >
          <Button className="searchBtn" type="primary">    
            Добавить 
          </Button>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default HomePage; 