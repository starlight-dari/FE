import styled from "styled-components";
import ReactMarkdown from "react-markdown";

export const ChatBubble = ({
  isUser,
  children,
}: {
  isUser: boolean;
  children: React.ReactNode;
}) => <Bubble isUser={isUser}>{children}</Bubble>;

export const CategoryButton = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => <Button onClick={onClick}>{children}</Button>;

export const ChatMessage = ({
  chat,
  index,
  lastMessageRef,
  handleGoBack,
  handleCategorySelect,
}: any) => (
  <Container key={index} ref={index === -1 ? lastMessageRef : null}>
    <ChatBubble isUser={true}>{chat.question}</ChatBubble>
    <ChatBubble isUser={false}>
      <ReactMarkdown>{chat.response}</ReactMarkdown>
    </ChatBubble>
    {chat.extraMessage && (
      <ChatBubble isUser={false}>{chat.extraMessage}</ChatBubble>
    )}
    {chat.showBackButton && (
      <CategoryButton onClick={handleGoBack}>돌아가기</CategoryButton>
    )}
    {chat.categories &&
      chat.categories.map((category: string, idx: number) => (
        <CategoryButton key={idx} onClick={() => handleCategorySelect(idx)}>
          {category}
        </CategoryButton>
      ))}
  </Container>
);

const Bubble = styled.div<{ isUser: boolean }>`
  background: ${(props) =>
    props.isUser
      ? "#E2E8F6"
      : "linear-gradient(to bottom, #d9d9d91a 0%, #7373731a 100%)"};
  color: ${(props) => (props.isUser ? "#3F4A61" : "#fff")};
  padding: 14px;
  border-radius: 5px;
  margin-left: ${(props) => (props.isUser ? "90px" : "0")};
  width: 282px;
  padding: 14px;
  line-height: 1.5;
  letter-spacing: 1.2px;
`;

const Button = styled.button`
  cursor: pointer;
  font-family: "Pretendard-Regular", sans-serif;
  font-size: 14px;
  color: #fff;
  background: linear-gradient(to bottom, #d9d9d91a 0%, #7373731a 100%);
  width: 310px;
  padding: 14px;
  border-radius: 5px;
  text-align: left;
  border: none;
  line-height: 1.5;
  letter-spacing: 1.2px;

  &:hover {
    background: #4c566b;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 7px;
`;
