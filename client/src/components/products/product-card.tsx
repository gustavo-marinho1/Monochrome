import { Heart } from 'lucide-react';
import { currency } from '../../services/utils';

interface ProductCardProps {
  id: number;
  title: string;
  subtitle: string;
  price: number;
  image: string;
}

export function ProductCard({ title, subtitle, price, image }: ProductCardProps) {
  return (
    <div className="group cursor-pointer">

      <div className="relative aspect-[4/4] bg-card rounded-lg overflow-hidden mb-3">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        <button className="absolute top-3 right-3 h-9 w-9 rounded-full bg-background/80 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background">
          <Heart className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-1">
        <h3 className="text-sm">{title}</h3>
        <p className="text-xs text-muted-foreground uppercase tracking-wider">{subtitle}</p>
        <p className="text-sm text-foreground">{currency(price)}</p>
      </div>

    </div>
  );
}
