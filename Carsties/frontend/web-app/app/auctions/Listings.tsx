"use client"

import { useAuctionStore } from "@/hooks/useAuctionStore"
import { useParamsStore } from "@/hooks/useParamsStore"
import qs from "query-string"
import { useEffect, useState } from "react"
import { shallow } from "zustand/shallow"
import { getData } from "../actions/auctionActions"
import AppPagintation from "../components/AppPagintation"
import EmptyFilter from "../components/EmptyFilter"
import AuctionCard from "./AuctionCard"
import Filters from "./Filters"

export default function Listings() {
	const [loading, setLoading] = useState(true)
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
	const data = useAuctionStore(
		(state) => ({
			auctions: state.auctions,
			totalCount: state.totalCount,
			pageCount: state.pageCount,
		}),
		shallow,
	)
	const setData = useAuctionStore((state) => state.setData)
	const setParams = useParamsStore((state) => state.setParams)
	const url = qs.stringifyUrl({ url: "", query: params })

	function setPageNunber(pageNumber: number) {
		setParams({ pageNumber: pageNumber })
	}

	useEffect(() => {
		getData(url).then((data) => {
			setData(data)
			setLoading(false)
		})
	}, [url, setData])

	if (loading) return <h3>Loading...</h3>

	return (
		<>
			<Filters />
			{data.totalCount === 0 ? (
				<EmptyFilter showReset />
			) : (
				<>
					<div className="grid grid-cols-4 gap-6">
						{data.auctions.map((auction) => (
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
			)}
		</>
	)
}
