import React from "react";
import Image from "next/image";

const PropertyImages = ({ images }) => {
  return (
    <section className="bg-blue-50 p-4">
      <div className="container mt-auto">
        {images.length == 1 ? (
          <Image src={images[0]} alt="Property Image" className="object-cover h-[400px] mx-auto rounded-xl" height={400} width={1800} priority={true} />
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {images.map((image, index) => (
              <div
                key={index}
                className={`
                ${images.length === 3 && index == 2 ? "col-span-2" : "col-span-1"}
              `}
              >
                <Image src={image} alt="Property Image" className="object-cover h-[400px] w-full rounded-xl" height={0} width={0} sizes="100vw" priority={true} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertyImages;
