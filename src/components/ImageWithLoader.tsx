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
  const [imageState, setImageState] = useState<{
    src: string | undefined;
    isLoaded: boolean;
    hasError: boolean;
  }>({
    src: undefined,
    isLoaded: false,
    hasError: false,
  });

  const isCurrentImage = imageState.src === src;
  const isLoaded = isCurrentImage && imageState.isLoaded;
  const hasError = isCurrentImage && imageState.hasError;

  useEffect(() => {
    const image = imageRef.current;

    if (!image || !src) {
      return;
    }

    if (!image.complete) {
      return;
    }

    let isActive = true;

    const updateCompletedImage = () => {
      if (!isActive) {
        return;
      }

      if (image.naturalWidth > 0) {
        setImageState({ src, isLoaded: true, hasError: false });
      } else {
        setImageState({ src, isLoaded: true, hasError: true });
      }
    };

    if (image.naturalWidth > 0 && "decode" in image) {
      image.decode().then(updateCompletedImage, updateCompletedImage);
    } else {
      window.queueMicrotask(updateCompletedImage);
    }

    return () => {
      isActive = false;
    };
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
          setImageState({ src, isLoaded: true, hasError: false });
          onLoad?.(event);
        }}
        onError={(event) => {
          setImageState({ src, isLoaded: true, hasError: true });
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
