type PageHeaderProps = {
  title: string;
  description?: string;
};

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <header className="flex flex-col items-center text-center py-10 mb-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
        {title}
      </h1>
      {description && (
        <p className="mt-1 text-sm sm:text-base text-muted-foreground">
          {description}
        </p>
      )}
    </header>
  );
}
