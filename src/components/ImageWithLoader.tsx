import {
  useEffect,
  useRef,
  useState,
  type ImgHTMLAttributes,
  type ReactNode,
} from "react";
import { LuLoaderCircle } from "react-icons/lu";

type ImageWithLoaderProps = ImgHTMLAttributes<HTMLImageElement> & {
  wrapperClassName?: string;
  spinnerClassName?: string;
  errorFallback?: ReactNode;
};

function ImageWithLoader({
  src,
  alt,
  className,
  wrapperClassName,
  spinnerClassName = "h-7 w-7 text-slate-400",
  errorFallback,
  onLoad,
  onError,
  ...imgProps
}: ImageWithLoaderProps) {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);
  }, [src]);

  useEffect(() => {
    const image = imageRef.current;

    if (!image || !src) {
      return;
    }

    if (image.complete) {
      if (image.naturalWidth > 0) {
        setIsLoaded(true);
        setHasError(false);
      } else {
        setHasError(true);
        setIsLoaded(true);
      }
    }
  }, [src]);

  const showSpinner = Boolean(src) && !isLoaded && !hasError;

  return (
    <div
      aria-busy={showSpinner}
      className={["relative", wrapperClassName].filter(Boolean).join(" ")}
    >
      {showSpinner ? (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <LuLoaderCircle
            aria-hidden="true"
            className={["animate-spin", spinnerClassName].filter(Boolean).join(" ")}
          />
        </div>
      ) : null}

      <img
        {...imgProps}
        ref={imageRef}
        src={src}
        alt={alt}
        onLoad={(event) => {
          setIsLoaded(true);
          onLoad?.(event);
        }}
        onError={(event) => {
          setHasError(true);
          setIsLoaded(true);
          onError?.(event);
        }}
        className={[
          className,
          "transition-opacity duration-300",
          isLoaded && !hasError ? "opacity-100" : "opacity-0",
        ]
          .filter(Boolean)
          .join(" ")}
      />

      {hasError ? errorFallback ?? null : null}
    </div>
  );
}

export default ImageWithLoader;
