import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetGenresQuery } from "@/redux/api/book-api";

type GenreSelectProps = {
  value?: string;
  onChange: (value: string) => void;
};

function formatGenreLabel(genre: string): string {
  return genre
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function GenreSelect({ value, onChange }: GenreSelectProps) {
  const { data, isLoading, isError } = useGetGenresQuery(undefined);

  const genres: string[] = data?.data ?? [];

  if (isLoading) return <div>Loading genres...</div>;
  if (isError || genres.length === 0) return <div>Failed to load genres</div>;

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select genre" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="All">All Genres</SelectItem>
        {genres.map((genre) => (
          <SelectItem key={genre} value={genre}>
            {formatGenreLabel(genre)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
