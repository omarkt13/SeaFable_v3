"use client" // This page fetches client-side data

import { SelectItem } from "@/components/ui/select"

import { SelectContent } from "@/components/ui/select"

import { SelectValue } from "@/components/ui/select"

import { SelectTrigger } from "@/components/ui/select"

import { Select } from "@/components/ui/select"

import { Input } from "@/components/ui/input"

import { Label } from "@/components/ui/label"

import type React from "react"

import { useEffect, useState, useCallback } from "react"
import { useParams, notFound, useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Star,
  MapPin,
  Clock,
  Users,
  CalendarDays,
  ShieldCheck,
  Tag,
  CheckCircle,
  Info,
  Sun,
  Cloud,
  Wind,
  WavesIcon,
  Thermometer,
  LifeBuoy,
  ActivityIcon as ActivityIconLucide,
} from "lucide-react"
import type {
  Experience,
  ActivitySpecificDetails,
  SailingSpecificDetails,
  SurfingSpecificDetails,
  KayakingSpecificDetails,
  DivingSpecificDetails,
  PaddleboardingSpecificDetails,
} from "@/types"
import { formatPrice } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton" // For loading state

// Helper to determine if details are for a specific activity
const isSailingDetails = (details: ActivitySpecificDetails): details is SailingSpecificDetails =>
  "vesselType" in details
const isSurfingDetails = (details: ActivitySpecificDetails): details is SurfingSpecificDetails => "waveType" in details
const isKayakingDetails = (details: ActivitySpecificDetails): details is KayakingSpecificDetails =>
  "waterBodyType" in details && "kayakTypesAvailable" in details
const isDivingDetails = (details: ActivitySpecificDetails): details is DivingSpecificDetails => "diveType" in details
const isPaddleboardingDetails = (details: ActivitySpecificDetails): details is PaddleboardingSpecificDetails =>
  "boardTypesAvailable" in details && "waterBodyType" in details

const ActivitySpecificDetailsDisplay: React.FC<{
  details: ActivitySpecificDetails
  activityType: Experience["activityType"]
}> = ({ details, activityType }) => {
  if (isSailingDetails(details)) {
    return (
      <>
        <p>
          <strong>Vessel:</strong> {details.vesselName} ({details.vesselType})
        </p>
        <p>
          <strong>Capacity:</strong> Up to {details.vesselCapacity} guests
        </p>
        {details.itineraryHighlights && (
          <p>
            <strong>Highlights:</strong> {details.itineraryHighlights.join(", ")}
          </p>
        )}
      </>
    )
  }
  if (isSurfingDetails(details)) {
    return (
      <>
        {details.boardTypesAvailable && (
          <p>
            <strong>Boards:</strong> {details.boardTypesAvailable.join(", ")}
          </p>
        )}
        {details.waveType && (
          <p>
            <strong>Wave Type:</strong> {details.waveType}
          </p>
        )}
        {details.skillLevelFocus && (
          <p>
            <strong>Focus:</strong> {details.skillLevelFocus.join(", ")}
          </p>
        )}
      </>
    )
  }
  if (isKayakingDetails(details)) {
    return (
      <>
        {details.kayakTypesAvailable && (
          <p>
            <strong>Kayaks:</strong> {details.kayakTypesAvailable.join(", ")}
          </p>
        )}
        {details.waterBodyType && (
          <p>
            <strong>Environment:</strong> {details.waterBodyType}
          </p>
        )}
        {details.routeDescription && (
          <p>
            <strong>Route:</strong> {details.routeDescription}
          </p>
        )}
      </>
    )
  }
  if (isDivingDetails(details)) {
    return (
      <>
        {details.diveType && (
          <p>
            <strong>Dive Type:</strong> {details.diveType}
          </p>
        )}
        {details.maxDepthMeters && (
          <p>
            <strong>Max Depth:</strong> {details.maxDepthMeters}m
          </p>
        )}
        {details.certificationRequired && (
          <p>
            <strong>Certification:</strong> {details.certificationRequired}
          </p>
        )}
        {details.equipmentRentalAvailable && <p>Equipment rental available</p>}
      </>
    )
  }
  if (isPaddleboardingDetails(details)) {
    return (
      <>
        {details.boardTypesAvailable && (
          <p>
            <strong>Boards:</strong> {details.boardTypesAvailable.join(", ")}
          </p>
        )}
        {details.waterBodyType && (
          <p>
            <strong>Environment:</strong> {details.waterBodyType}
          </p>
        )}
        {details.guidedTour && <p>Guided tour</p>}
      </>
    )
  }
  // Fallback for other activity types or generic details
  return Object.entries(details).map(([key, value]) => (
    <p key={key}>
      <strong>{key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}:</strong> {String(value)}
    </p>
  ))
}

export default function ExperienceDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const [experience, setExperience] = useState<Experience | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchExperienceDetails = useCallback(async () => {
    if (!id) return
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/experiences/${id}`)
      if (!response.ok) {
        if (response.status === 404) {
          notFound() // Trigger Next.js not found page
        }
        throw new Error(`Failed to fetch: ${response.statusText}`)
      }
      const result = await response.json()
      if (result.success) {
        setExperience(result.data)
      } else {
        setError(result.error || "Failed to load experience details.")
        if (result.error === "Experience not found") notFound()
      }
    } catch (err) {
      console.error("Error fetching experience details:", err)
      setError(err instanceof Error ? err.message : "An unknown error occurred.")
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    fetchExperienceDetails()
  }, [fetchExperienceDetails])

  if (loading) {
    return <ExperienceDetailSkeleton />
  }

  if (error) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Experience</h1>
        <p className="text-gray-700 mb-6">{error}</p>
        <Button onClick={() => router.push("/search")}>Back to Search</Button>
      </div>
    )
  }

  if (!experience) {
    // This case should ideally be handled by notFound() in fetch logic, but as a fallback:
    return notFound()
  }

  const {
    title,
    location,
    specificLocation,
    country,
    activityType,
    category,
    durationDisplay,
    maxGuests,
    rating,
    totalReviews,
    hostProfile,
    primaryImage,
    images = [],
    description,
    shortDescription,
    includedAmenities = [],
    whatToBring = [],
    itinerary = [],
    pricePerPerson,
    difficultyLevel,
    activitySpecificDetails,
    weatherContingency,
    ageRestrictions,
    tags = [],
  } = experience

  // Mock weather data for display
  const mockWeather = experience.weather || {
    temperatureCelsius: 22,
    condition: "sunny",
    windSpeedKph: 15,
    windDirection: "SW",
    waveHeightMeters: 0.5,
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container py-8 md:py-12">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-gray-600">
          <Link href="/" className="hover:text-teal-600">
            Home
          </Link>
          {" > "}
          <Link href="/search" className="hover:text-teal-600 capitalize">
            {activityType.replace(/_/g, " ")} Experiences
          </Link>
          {" > "}
          <span className="font-medium text-gray-800 line-clamp-1">{title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <Card className="shadow-lg">
              <CardContent className="p-0">
                <img
                  src={primaryImage || "/placeholder.svg?height=600&width=1000&query=water+activity"}
                  alt={title}
                  className="w-full h-72 md:h-96 object-cover rounded-t-lg"
                />
                {images.length > 1 && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-3">
                    {images.slice(0, 4).map((image, index) => (
                      <img
                        key={image.id || index}
                        src={image.imageUrl || "/placeholder.svg"}
                        alt={`${title} - view ${index + 1}`}
                        className="w-full h-20 sm:h-24 object-cover rounded-md cursor-pointer hover:opacity-80 transition-opacity"
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Title, Basic Info & Tags */}
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-navy-800 mb-2">{title}</h1>
                    <div className="flex items-center text-gray-600 mb-1">
                      <MapPin className="h-5 w-5 mr-2 text-teal-600" />
                      {specificLocation ? `${specificLocation}, ` : ""}
                      {location}, {country}
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500 mb-3">
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" /> {durationDisplay}
                      </span>
                      <span className="flex items-center">
                        <Users className="h-4 w-4 mr-1" /> Up to {maxGuests} guests
                      </span>
                      <span className="flex items-center capitalize">
                        <ActivityIconLucide className="h-4 w-4 mr-1" /> {difficultyLevel.replace("_", " ")}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center mt-2 sm:mt-0 text-lg shrink-0">
                    <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    <span className="font-semibold ml-1">{rating.toFixed(1)}</span>
                    <span className="text-gray-500 ml-1.5">({totalReviews} reviews)</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-100">
                  <Badge className="bg-teal-100 text-teal-700 capitalize text-sm py-1 px-2.5">
                    {activityType.replace(/_/g, " ")}
                  </Badge>
                  {category.map((cat) => (
                    <Badge key={cat} variant="secondary" className="capitalize text-sm py-1 px-2.5">
                      {cat.replace(/_/g, " ")}
                    </Badge>
                  ))}
                  {tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="capitalize text-sm py-1 px-2.5">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
            </Card>

            {/* Detailed Description */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-navy-800">About This Experience</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700 space-y-4 leading-relaxed">
                <p className="font-medium text-lg">{shortDescription}</p>
                <p>{description}</p>
                {activitySpecificDetails && Object.keys(activitySpecificDetails).length > 0 && (
                  <div className="mt-4 p-4 bg-gray-100 rounded-lg text-sm space-y-1">
                    <h4 className="font-semibold text-md text-gray-800 mb-2">Activity Specifics:</h4>
                    <ActivitySpecificDetailsDisplay details={activitySpecificDetails} activityType={activityType} />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* What's Included & What to Bring */}
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-navy-800">What's Included</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-700">
                    {includedAmenities.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="h-5 w-5 mr-2 text-green-500 shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-navy-800">What to Bring</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-700">
                    {whatToBring.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <Tag className="h-5 w-5 mr-2 text-blue-500 shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Itinerary */}
            {itinerary && itinerary.length > 0 && (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-navy-800">Itinerary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {itinerary.map((step, index) => (
                    <div key={step.id || index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="bg-teal-500 text-white rounded-full h-8 w-8 flex items-center justify-center font-semibold">
                          {index + 1}
                        </div>
                        {index < itinerary.length - 1 && <div className="w-px h-full bg-gray-300 my-2"></div>}
                      </div>
                      <div>
                        {step.timeEstimate && <p className="text-sm text-gray-500 mb-1">{step.timeEstimate}</p>}
                        <h3 className="font-semibold text-lg text-gray-800 mb-1">{step.title}</h3>
                        <p className="text-gray-600 text-sm">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Host Profile */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-navy-800">
                  Meet Your{" "}
                  {hostProfile.hostType === "company"
                    ? "Organizer"
                    : hostProfile.hostType.charAt(0).toUpperCase() + hostProfile.hostType.slice(1)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row items-start gap-6">
                  <Avatar className="h-24 w-24 border-4 border-gray-100 shadow-md">
                    <AvatarImage src={hostProfile.avatarUrl || "/placeholder.svg"} alt={hostProfile.name} />
                    <AvatarFallback className="text-2xl">
                      {hostProfile.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800">{hostProfile.name}</h3>
                    {hostProfile.business_name && hostProfile.hostType === "company" && (
                      <p className="text-md text-gray-600">{hostProfile.business_name}</p>
                    )}
                    <div className="flex items-center my-1.5">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <span className="ml-1 font-medium">{hostProfile.rating.toFixed(1)}</span>
                      <span className="ml-2 text-gray-500 text-sm">({hostProfile.totalReviews} reviews)</span>
                      <span className="ml-3 text-gray-500 text-sm">{hostProfile.yearsExperience} years experience</span>
                    </div>
                    <p className="text-gray-600 leading-relaxed text-sm mb-3">{hostProfile.bio}</p>
                    {hostProfile.specialties && hostProfile.specialties.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {hostProfile.specialties.slice(0, 4).map((spec) => (
                          <Badge key={spec} variant="secondary">
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Info (Weather Contingency, Age Restrictions) */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-navy-800">Important Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-gray-700">
                {weatherContingency && (
                  <div className="flex items-start">
                    <Cloud className="h-5 w-5 mr-3 mt-0.5 text-blue-500 shrink-0" />
                    <div>
                      <strong className="text-gray-800">Weather Policy:</strong> {weatherContingency}
                    </div>
                  </div>
                )}
                {ageRestrictions && (ageRestrictions.min || ageRestrictions.details) && (
                  <div className="flex items-start">
                    <Info className="h-5 w-5 mr-3 mt-0.5 text-orange-500 shrink-0" />
                    <div>
                      <strong className="text-gray-800">Age Requirements:</strong>
                      {ageRestrictions.min && ` Minimum age ${ageRestrictions.min}.`}
                      {ageRestrictions.max && ` Maximum age ${ageRestrictions.max}.`}
                      {ageRestrictions.details && ` ${ageRestrictions.details}`}
                    </div>
                  </div>
                )}
                <div className="flex items-start">
                  <LifeBuoy className="h-5 w-5 mr-3 mt-0.5 text-red-500 shrink-0" />
                  <div>
                    <strong className="text-gray-800">Safety:</strong> Your safety is our top priority. All activities
                    adhere to strict safety standards and are led by experienced professionals.
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking & Weather Sidebar */}
          <div className="lg:col-span-1 space-y-8 lg:sticky lg:top-8 self-start">
            <Card className="shadow-xl border-teal-500 border-2">
              <CardHeader className="bg-teal-600 text-white rounded-t-lg p-5">
                <div className="text-3xl font-bold"> {formatPrice(pricePerPerson)}</div>
                <div className="opacity-90">per person</div>
              </CardHeader>
              <CardContent className="p-5 space-y-5">
                <div>
                  <Label htmlFor="booking-date" className="block text-sm font-medium mb-1.5 text-gray-700">
                    Select Date
                  </Label>
                  <div className="relative">
                    <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="booking-date"
                      type="date"
                      defaultValue={new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]} // Default to 3 days from now
                      className="w-full pl-10 pr-3 py-2.5 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="guests" className="block text-sm font-medium mb-1.5 text-gray-700">
                    Number of Guests
                  </Label>
                  <Select defaultValue="1">
                    <SelectTrigger className="w-full py-2.5 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[...Array(maxGuests)].map((_, i) => (
                        <SelectItem key={i + 1} value={(i + 1).toString()}>
                          {i + 1} guest{i > 0 ? "s" : ""}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  size="lg"
                  className="w-full bg-teal-500 hover:bg-teal-600 text-white text-lg py-3.5 font-semibold"
                >
                  Book Now
                </Button>
                <Button
                  variant="outline"
                  className="w-full text-teal-600 border-teal-500 hover:bg-teal-50 text-md py-3"
                >
                  Ask a Question
                </Button>
                <div className="text-center text-xs text-gray-500 pt-2">
                  <ShieldCheck className="inline h-4 w-4 mr-1 text-green-600" />
                  Free cancellation up to 24 hours before
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-navy-800 flex items-center">
                  <Sun className="h-5 w-5 mr-2 text-yellow-500" /> Weather Outlook
                </CardTitle>
                <CardDescription className="text-sm">For {location}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-gray-700">
                <div className="flex justify-between items-center">
                  <span className="flex items-center">
                    <Thermometer className="h-4 w-4 mr-1.5 text-red-500" /> Temperature:
                  </span>
                  <span className="font-medium">{mockWeather.temperatureCelsius}°C</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center">
                    <Cloud className="h-4 w-4 mr-1.5 text-blue-400" /> Condition:
                  </span>
                  <span className="font-medium capitalize">{mockWeather.condition.replace("_", " ")}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center">
                    <Wind className="h-4 w-4 mr-1.5 text-sky-500" /> Wind:
                  </span>
                  <span className="font-medium">
                    {mockWeather.windSpeedKph} kph {mockWeather.windDirection}
                  </span>
                </div>
                {mockWeather.waveHeightMeters !== undefined && (
                  <div className="flex justify-between items-center">
                    <span className="flex items-center">
                      <WavesIcon className="h-4 w-4 mr-1.5 text-cyan-500" /> Waves:
                    </span>
                    <span className="font-medium">{mockWeather.waveHeightMeters}m</span>
                  </div>
                )}
                <p className="text-xs text-gray-500 pt-2">
                  Weather data is indicative. Always check with the host for up-to-date conditions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

// Skeleton component for loading state
const ExperienceDetailSkeleton = () => (
  <div className="container py-8 md:py-12">
    <Skeleton className="h-6 w-1/2 mb-6" /> {/* Breadcrumb */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <Card>
          <Skeleton className="w-full h-72 md:h-96 rounded-t-lg" />
          <div className="grid grid-cols-4 gap-2 p-3">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="w-full h-20 sm:h-24 rounded-md" />
            ))}
          </div>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className="h-10 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-3" />
            <div className="flex gap-2 mt-3 pt-3 border-t">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-24" />
            </div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-1/3 mb-2" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-5 w-full mb-2" />
            <Skeleton className="h-5 w-full mb-2" />
            <Skeleton className="h-5 w-5/6" />
          </CardContent>
        </Card>
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-1/2 mb-2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-1/2 mb-2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="lg:col-span-1 space-y-8">
        <Card>
          <CardHeader className="p-5">
            <Skeleton className="h-8 w-1/2 mb-1" />
            <Skeleton className="h-4 w-1/3" />
          </CardHeader>
          <CardContent className="p-5 space-y-5">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-12 w-full" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-3/4 mb-1" />
          </CardHeader>
          <CardContent className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
)
