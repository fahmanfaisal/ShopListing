import { useState } from "react";
import { imageAt } from "../../lib/format";

const ProductImage = ({ src, alt = "", width = 600, className = "" }) => {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`grid place-items-center bg-gradient-to-br from-sunken to-line text-muted ${className}`}
      >
        <span className="font-display text-5xl">{alt.trim().charAt(0).toUpperCase() || "?"}</span>
      </div>
    );
  }

  return (
    <img
      src={imageAt(src, width)}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  );
};

export default ProductImage;
