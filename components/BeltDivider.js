const belts = [
  "#f4f1ea", // თეთრი
  "#f3c94f", // ყვითელი
  "#e07a2c", // ნარინჯისფერი
  "#4a8f4a", // მწვანე
  "#2c5aa6", // ლურჯი
  "#6b4226", // ყავისფერი
  "#14171c", // შავი
];

export default function BeltDivider() {
  return (
    <div className="flex w-full h-1.5">
      {belts.map((color, i) => (
        <span key={i} style={{ background: color }} className="flex-1" />
      ))}
    </div>
  );
}
