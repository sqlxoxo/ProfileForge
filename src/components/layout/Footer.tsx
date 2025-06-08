export default function Footer() {
  return (
    <footer className="bg-card text-card-foreground py-6 mt-auto">
      <div className="container mx-auto px-4 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} ProfileForge. All rights reserved. Crafted with care.</p>
      </div>
    </footer>
  );
}
