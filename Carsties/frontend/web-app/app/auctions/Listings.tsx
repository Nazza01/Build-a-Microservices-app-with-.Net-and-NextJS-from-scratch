"use client"

import { useParamsStore } from "@/hooks/useParamsStore"
import { Auction, PagedResult } from "@/types"
import qs from "query-string"
import { useEffect, useState } from "react"
import { shallow } from "zustand/shallow"
import { getData } from "../actions/auctionActions"
import AppPagintation from "../components/AppPagintation"
import EmptyFilter from "../components/EmptyFilter"
import AuctionCard from "./AuctionCard"
import Filters from "./Filters"

export default function Listings() {
	const [data, setData] = useState<PagedResult<Auction>>()
	const params = useParamsStore(
		(state) => ({
			pageNumber: state.pageNumber,
			pageSize: state.pageSize,
			searchTerm: state.searchTerm,
			orderBy: state.orderBy,
			filterBy: state.filterBy,
			seller: state.seller,
			winner: state.winner,
		}),
		shallow,
	)
	const setParams = useParamsStore((state) => state.setParams)
	const url = qs.stringifyUrl({ url: "", query: params })

	function setPageNunber(pageNumber: number) {
		setParams({ pageNumber: pageNumber })
	}

	useEffect(() => {
		getData(url).then((data) => {
			setData(data)
		})
	}, [url])

	if (!data) return <h3>Loading...</h3>

	if (data.totalCount === 0) return <EmptyFilter showReset />

	return (
		<>
			<Filters />
			<div className="grid grid-cols-4 gap-6">
				{data.results.map((auction) => (
					<AuctionCard
						auction={auction}
						key={auction.id}
					/>
				))}
			</div>
			<div className="flex justify-center mt-4">
				<AppPagintation
					currentPage={params.pageNumber}
					pageCount={data.pageCount}
					pageChanged={setPageNunber}
				/>
			</div>
		</>
	)
}
