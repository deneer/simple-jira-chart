interface ExcludedListProps {
  data: {
    x?: number | null;
    y?: number | null;
    z?: number | null;
    title: string;
  }[];
}

const ExcludedList = ({ data }: ExcludedListProps) => {
  console.log("?", data);
  console.log("??", data.length);
  return data.length > 0 ? (
    <div>
      <h2>Excluded Items</h2>
      <ul>
        {data.map((issue) => (
          <li>{issue.title}</li>
        ))}
      </ul>
    </div>
  ) : (
    <></>
  );
};

export default ExcludedList;
