import { urlFor } from "../../../sanity"

const SanityImage = ({ image }) => {
  return (
    <div>
      <img src={urlFor(image).auto("format")} />
    </div>
  )
}

export default SanityImage;