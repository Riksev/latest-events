import ImageWithFallback from "@/components/ImageWithFallback";

export default function Loading(): React.JSX.Element {
    return (
        <>
            <ImageWithFallback
                src={"/images/loading-gif.gif"}
                alt="Loading"
                width={50}
                height={50}
                className="m-auto"
            />
            <p className="w-full text-center mt-2">Loading...</p>
        </>
    );
}
