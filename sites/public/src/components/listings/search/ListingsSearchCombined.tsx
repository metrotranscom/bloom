import { useState } from "react"
import { FormOption, ListingsSearchForm } from "./ListingsSearchForm"
import { ListingSearchParams, generateSearchQuery } from "../../../lib/listings/search"
import { ListingService } from "../../../lib/listings/listing-service"
import { ListingsCombined } from "../ListingsCombined"

type ListingsSearchCombinedProps = {
  searchString?: string
  listingsEndpoint: string
  bedrooms: FormOption[]
  bathrooms: FormOption[]
  counties: FormOption[]
}

export function ListingsSearchCombined(props: ListingsSearchCombinedProps) {

  const [listings, setListings] = useState([])

  const onFormSubmit = async (params: ListingSearchParams) => {
    const qb = generateSearchQuery(params)
    const listingService = new ListingService(props.listingsEndpoint)
    const result = await listingService.searchListings(qb)

    console.log(result)
    setListings(result)
  }

  return (
    <div>
      <ListingsSearchForm
        bedrooms={props.bedrooms}
        bathrooms={props.bathrooms}
        counties={props.counties}
        onSubmit={onFormSubmit}
      />

      <ListingsCombined listings={listings} />
    </div>
  )
}
