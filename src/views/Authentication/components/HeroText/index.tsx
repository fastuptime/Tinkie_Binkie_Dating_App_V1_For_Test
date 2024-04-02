import React from "react";
import {
  Container,
  RotatedRectangle,
  Title,
  Line,
  UnderlineContainer,
} from "./styles";

export const Underline = ({ children }) => (
  <UnderlineContainer>
    <Line />
    {children}
  </UnderlineContainer>
);

export const RectangleHighLight = ({ children }) => (
  <UnderlineContainer>
    <RotatedRectangle />
    {children}
  </UnderlineContainer>
);

const HeroText: React.FC = () => {
  return (
    <Container>
      <Title>Tinkie </Title>
      <RectangleHighLight>
        <Title style={{ color: "white" }}>Binkie</Title>
      </RectangleHighLight>
      {/* <Title> perto de </Title>
      <RectangleHighLight>
        <Title style={{ color: "white" }}>você</Title>
      </RectangleHighLight> */}
    </Container>
  );
};

export default HeroText;
