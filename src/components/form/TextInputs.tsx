import EditableDiv from "../common/EditableDiv";

const TextInputs = ({ type }: { type: string }) => {
  return (
    <>
      <EditableDiv
        placeholder={type === "textShort" ? "단답형 텍스트" : "장문형 텍스트"}
        contentEditable={false}
        style={{
          color: "#555",
          fontSize: "14px",
          borderBottom: "1px dotted #999",
          padding: "10px 0 5px 2px",
          width: type === "textShort" ? "50%" : "85%",
        }}
      />
    </>
  );
};

export default TextInputs;
