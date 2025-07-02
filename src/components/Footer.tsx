export default function Footer() {
  const date = new Date().getFullYear();
  return (
    <footer className="border-t bg-background">
      <div className="container flex items-center justify-center mx-auto gap-4 py-6">
        <span className="text-sm text-muted-foreground">
          &copy; {date} LibriX. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
