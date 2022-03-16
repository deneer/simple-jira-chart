interface ExcludedListProps {
  data: {
    x?: number | null;
    y?: number | null;
    z?: number | null;
    label: string;
  }[];
}

const ExcludedList = ({ data }: ExcludedListProps) => {
  return (
    <div>
      <h2>Excluded Items</h2>
      <ul>
        {data.map((issue) => (
          <li>{issue.label}</li>
        ))}
      </ul>
    </div>
  );
};

export default ExcludedList;
