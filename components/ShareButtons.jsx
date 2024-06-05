import React from "react";
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, EmailShareButton, EmailIcon } from "react-share";

const ShareButtons = ({ property }) => {
  const shareURL = `${process.env.NEXT_PUBLIC_DOMAIN}/property/${property._id}`;

  return (
    <>
      <h3 className="text-xl font-bold text-center pt-2">Share this property:</h3>
      <div className="flex gap-3 justify-center pb-5">
        <FacebookShareButton url={shareURL} quote={property.name} hashtag={`#${property.type.replace(/\s/g, "")}forRent`}>
          <FacebookIcon size={40} round />
        </FacebookShareButton>
        <TwitterShareButton url={shareURL} title={property.name} hashtags={[`${property.type.replace(/\s/g, "")}forRent`]}>
          <TwitterIcon size={40} round />
        </TwitterShareButton>
        <EmailShareButton url={shareURL} subject={property.name} body={`Check out this property: ${property.name} at ${shareURL}`}>
          <EmailIcon size={40} round />
        </EmailShareButton>
      </div>
    </>
  );
};

export default ShareButtons;
