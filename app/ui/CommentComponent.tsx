interface comment {
  avt: string;
  name: string;
  text: string;
}
function CommentComponent(pros: comment) {
  return (
    <div style={{ display: "flex" }}>
      <img src={pros.avt} style={{ width: 42, height: 43, marginRight: 15 }} />
      <div
        style={{
          border: "1px solid #d8d8d8",
          width: "95%",
          marginBottom: 35,
        }}
      >
        <p style={{ margin: 8, fontWeight: "bold", color: "#ff9040" }}>
          {pros.name}
        </p>

        <div style={{ border: "1px solid #d8d8d8", margin: 8 }} />
        <p style={{ marginLeft: 8, margin: 12 }}>{pros.text}</p>
      </div>
    </div>
  );
}

export default CommentComponent;
