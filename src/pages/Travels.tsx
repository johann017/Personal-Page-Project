import React, { useState } from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps';
import PublicIcon from '@mui/icons-material/Public';
import FlagIcon from '@mui/icons-material/Flag';
import LocationOnIcon from '@mui/icons-material/LocationOn';

// Country outlines (always visible)
const WORLD_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';
// US state boundaries in WGS84 geographic coordinates
const US_STATES_URL =
  'https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json';

interface City {
  name: string;
  coordinates: [number, number];
  region: string;
  country: string;
  usState?: string; // set for US cities; "DC" for Washington DC
}

const cities: City[] = [
  // United States
  { name: 'New York City',        coordinates: [-74.006,   40.7128], region: 'New York, USA',           country: 'USA', usState: 'New York' },
  { name: 'Los Angeles',          coordinates: [-118.2437, 34.0522], region: 'California, USA',          country: 'USA', usState: 'California' },
  { name: 'San Francisco',        coordinates: [-122.4194, 37.7749], region: 'California, USA',          country: 'USA', usState: 'California' },
  { name: 'San Jose',             coordinates: [-121.8863, 37.3382], region: 'California, USA',          country: 'USA', usState: 'California' },
  { name: 'San Diego',            coordinates: [-117.1611, 32.7157], region: 'California, USA',          country: 'USA', usState: 'California' },
  { name: 'Sacramento',           coordinates: [-121.4944, 38.5816], region: 'California, USA',          country: 'USA', usState: 'California' },
  { name: 'Chicago',              coordinates: [-87.6298,  41.8781], region: 'Illinois, USA',            country: 'USA', usState: 'Illinois' },
  { name: 'Bloomington',          coordinates: [-88.9937,  40.4842], region: 'Illinois, USA',            country: 'USA', usState: 'Illinois' },
  { name: 'Champaign',            coordinates: [-88.2434,  40.1164], region: 'Illinois, USA',            country: 'USA', usState: 'Illinois' },
  { name: 'Dallas',               coordinates: [-96.797,   32.7767], region: 'Texas, USA',               country: 'USA', usState: 'Texas' },
  { name: 'Fort Worth',           coordinates: [-97.3208,  32.7555], region: 'Texas, USA',               country: 'USA', usState: 'Texas' },
  { name: 'Austin',               coordinates: [-97.7431,  30.2672], region: 'Texas, USA',               country: 'USA', usState: 'Texas' },
  { name: 'Houston',              coordinates: [-95.3698,  29.7604], region: 'Texas, USA',               country: 'USA', usState: 'Texas' },
  { name: 'New Orleans',          coordinates: [-90.0715,  29.9511], region: 'Louisiana, USA',           country: 'USA', usState: 'Louisiana' },
  { name: 'Detroit',              coordinates: [-83.0458,  42.3314], region: 'Michigan, USA',            country: 'USA', usState: 'Michigan' },
  { name: 'Ann Arbor',            coordinates: [-83.743,   42.2808], region: 'Michigan, USA',            country: 'USA', usState: 'Michigan' },
  { name: 'Atlanta',              coordinates: [-84.388,   33.749],  region: 'Georgia, USA',             country: 'USA', usState: 'Georgia' },
  { name: 'Miami',                coordinates: [-80.1918,  25.7617], region: 'Florida, USA',             country: 'USA', usState: 'Florida' },
  { name: 'Fort Lauderdale',      coordinates: [-80.1373,  26.1224], region: 'Florida, USA',             country: 'USA', usState: 'Florida' },
  { name: 'Washington DC',        coordinates: [-77.0369,  38.9072], region: 'Washington DC, USA',       country: 'USA', usState: 'DC' },
  { name: 'Alexandria',           coordinates: [-77.0469,  38.8048], region: 'Virginia, USA',            country: 'USA', usState: 'Virginia' },
  { name: 'Arlington',            coordinates: [-77.1067,  38.8816], region: 'Virginia, USA',            country: 'USA', usState: 'Virginia' },
  { name: 'Baltimore',            coordinates: [-76.6122,  39.2904], region: 'Maryland, USA',            country: 'USA', usState: 'Maryland' },
  { name: 'College Park',         coordinates: [-76.9269,  38.9807], region: 'Maryland, USA',            country: 'USA', usState: 'Maryland' },
  { name: 'Boston',               coordinates: [-71.0589,  42.3601], region: 'Massachusetts, USA',       country: 'USA', usState: 'Massachusetts' },
  { name: 'Philadelphia',         coordinates: [-75.1652,  39.9526], region: 'Pennsylvania, USA',        country: 'USA', usState: 'Pennsylvania' },
  { name: 'Morgantown',           coordinates: [-79.9559,  39.6295], region: 'West Virginia, USA',       country: 'USA', usState: 'West Virginia' },
  { name: 'Jersey City',          coordinates: [-74.0776,  40.7178], region: 'New Jersey, USA',           country: 'USA', usState: 'New Jersey' },
  { name: 'Hoboken',              coordinates: [-74.0323,  40.744],  region: 'New Jersey, USA',           country: 'USA', usState: 'New Jersey' },
  { name: 'Wilmington',           coordinates: [-75.5399,  39.7447], region: 'Delaware, USA',             country: 'USA', usState: 'Delaware' },
  { name: 'Michigan City',        coordinates: [-86.895,   41.7075], region: 'Indiana, USA',              country: 'USA', usState: 'Indiana' },
  { name: 'Honolulu',             coordinates: [-157.8583, 21.3069], region: 'Hawaii, USA',              country: 'USA', usState: 'Hawaii' },
  { name: 'Las Vegas',            coordinates: [-115.1398, 36.1699], region: 'Nevada, USA',              country: 'USA', usState: 'Nevada' },
  { name: 'Reno',                 coordinates: [-119.8138, 39.5296], region: 'Nevada, USA',              country: 'USA', usState: 'Nevada' },
  { name: 'Lake Tahoe',           coordinates: [-120.0324, 39.0968], region: 'Nevada/California, USA',   country: 'USA', usState: 'Nevada' },
  { name: 'Zion National Park',   coordinates: [-113.0263, 37.2982], region: 'Utah, USA',                country: 'USA', usState: 'Utah' },
  { name: 'Arches National Park', coordinates: [-109.5925, 38.7331], region: 'Utah, USA',                country: 'USA', usState: 'Utah' },
  // Canada
  { name: 'Toronto',    coordinates: [-79.3832, 43.6532], region: 'Ontario, Canada',             country: 'Canada' },
  // Mexico
  { name: 'Cancún',     coordinates: [-86.8515, 21.1619], region: 'Quintana Roo, Mexico',        country: 'Mexico' },
  // Costa Rica
  { name: 'San José',   coordinates: [-84.0907, 9.9281],  region: 'San José, Costa Rica',        country: 'Costa Rica' },
  { name: 'Liberia',    coordinates: [-85.4397, 10.6348], region: 'Guanacaste, Costa Rica',      country: 'Costa Rica' },
  { name: 'Monteverde', coordinates: [-84.8259, 10.3028], region: 'Puntarenas, Costa Rica',      country: 'Costa Rica' },
  // Europe
  { name: 'London',       coordinates: [-0.1276,  51.5074], region: 'England, UK',                   country: 'United Kingdom' },
  { name: 'Paris',        coordinates: [2.3522,   48.8566], region: 'Île-de-France, France',         country: 'France' },
  { name: 'Madrid',       coordinates: [-3.7038,  40.4168], region: 'Community of Madrid, Spain',    country: 'Spain' },
  { name: 'Barcelona',    coordinates: [2.1734,   41.3851], region: 'Catalonia, Spain',              country: 'Spain' },
  { name: 'Seville',      coordinates: [-5.9845,  37.3891], region: 'Andalusia, Spain',              country: 'Spain' },
  { name: 'Rome',         coordinates: [12.4964,  41.9028], region: 'Lazio, Italy',                  country: 'Italy' },
  { name: 'Vatican City', coordinates: [12.4534,  41.9029], region: 'Vatican City',                  country: 'Vatican City' },
  { name: 'Athens',       coordinates: [23.7275,  37.9838], region: 'Attica, Greece',                country: 'Greece' },
  { name: 'Santorini',    coordinates: [25.4615,  36.3932], region: 'South Aegean, Greece',          country: 'Greece' },
  { name: 'Delphi',       coordinates: [22.5009,  38.4824], region: 'Central Greece',                country: 'Greece' },
  { name: 'Istanbul',     coordinates: [28.9784,  41.0082], region: 'Istanbul, Turkey',              country: 'Turkey' },
  { name: 'Cappadocia',   coordinates: [34.8293,  38.6431], region: 'Nevşehir, Turkey',              country: 'Turkey' },
  // Middle East
  { name: 'Dubai', coordinates: [55.2708, 25.2048], region: 'Dubai, UAE', country: 'UAE' },
  // India
  { name: 'Mumbai',     coordinates: [72.8777, 19.076],  region: 'Maharashtra, India', country: 'India' },
  { name: 'Hyderabad',  coordinates: [78.4867, 17.385],  region: 'Telangana, India',   country: 'India' },
  { name: 'Kochi',      coordinates: [76.2673, 9.9312],  region: 'Kerala, India',      country: 'India' },
  { name: 'Trivandrum', coordinates: [76.9366, 8.5241],  region: 'Kerala, India',      country: 'India' },
  // East Asia
  { name: 'Tokyo',  coordinates: [139.6917, 35.6895], region: 'Kantō, Japan',  country: 'Japan' },
  { name: 'Osaka',  coordinates: [135.5023, 34.6937], region: 'Kansai, Japan', country: 'Japan' },
  { name: 'Kyoto',  coordinates: [135.7681, 35.0116], region: 'Kansai, Japan', country: 'Japan' },
  // Southeast Asia
  { name: 'Singapore', coordinates: [103.8198, 1.3521], region: 'Singapore', country: 'Singapore' },
];

// Derived stats
const countryCount = new Set(cities.map((c) => c.country)).size;
const usStateCount = new Set(cities.filter((c) => c.usState).map((c) => c.usState)).size;

// Pin tip sits at SVG origin (0,0); balloon extends upward.
// The `scale` prop is 1/currentZoom so pins stay constant screen-size as the map zooms.
function MapPin({ active, scale }: { active: boolean; scale: number }) {
  const fill   = active ? '#a7f3d0' : '#6ee7b7';
  const glow   = active ? 'rgba(110,231,183,0.6)' : 'rgba(110,231,183,0.3)';
  return (
    <g
      transform={`scale(${scale})`}
      style={{ filter: `drop-shadow(0 1px 4px ${glow})`, transformOrigin: '0 0' }}
    >
      {/* Balloon body */}
      <circle cx={0} cy={-9} r={5} fill={fill} />
      {/* Tail */}
      <polygon points="-3.5,-5.5 3.5,-5.5 0,0" fill={fill} />
      {/* Inner hole */}
      <circle cx={0} cy={-9} r={2} fill="#0d0d10" />
    </g>
  );
}


function Travels(): React.ReactElement {
  const [zoom, setZoom]           = useState(1);
  const [hoveredCity, setHoveredCity] = useState<City | null>(null);
  const [tooltipPos, setTooltipPos]   = useState({ x: 0, y: 0 });

  // Track zoom continuously so pins counter-scale in real time
  const handleMove = ({ zoom: z }: { x: number; y: number; zoom: number; dragging: WheelEvent }) => {
    setZoom(z);
  };

  const handleMouseEnter = (city: City, evt: React.MouseEvent) => {
    setHoveredCity(city);
    setTooltipPos({ x: evt.clientX, y: evt.clientY });
  };

  const handleMouseMove = (evt: React.MouseEvent) => {
    setTooltipPos({ x: evt.clientX, y: evt.clientY });
  };

  const handleMouseLeave = () => setHoveredCity(null);

  const pinScale = 1 / zoom;

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      sx={{
        minHeight: '100vh',
        pt: { xs: 10, md: 12 },
        pb: 8,
        background:
          'radial-gradient(ellipse at 20% 30%, rgba(110,231,183,0.06) 0%, transparent 50%), ' +
          'radial-gradient(ellipse at 80% 70%, rgba(129,140,248,0.05) 0%, transparent 50%), #0d0d10',
      }}
    >
      <Container maxWidth="xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
            <PublicIcon sx={{ color: 'primary.main', fontSize: '1.1rem' }} />
            <Typography
              sx={{
                color: 'primary.main',
                letterSpacing: '0.22em',
                fontSize: '0.75rem',
                fontWeight: 600,
                textTransform: 'uppercase',
              }}
            >
              Travel Map
            </Typography>
          </Box>
          <Typography
            variant="h2"
            sx={{
              fontFamily: '"Space Grotesk", sans-serif',
              fontWeight: 800,
              fontSize: { xs: '2.2rem', md: '3.2rem' },
              letterSpacing: '-0.03em',
              mb: 1.5,
              background: 'linear-gradient(135deg, #e8e8f0 25%, #6ee7b7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Places I've Been
          </Typography>
          <Typography sx={{ color: 'text.secondary', mb: 4, fontSize: '1rem', maxWidth: 520, lineHeight: 1.7 }}>
            Hover a pin to see where. Scroll to zoom, drag to pan.
          </Typography>

          {/* Stats row */}
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 4 }}>
            {[
              {
                icon: <FlagIcon sx={{ fontSize: '1.3rem', color: 'primary.main' }} />,
                value: countryCount,
                label: 'Countries Visited',
              },
              {
                icon: <LocationOnIcon sx={{ fontSize: '1.3rem', color: 'primary.main' }} />,
                value: usStateCount,
                label: 'US States & DC',
              },
            ].map((stat) => (
              <Box
                key={stat.label}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  bgcolor: 'rgba(110, 231, 183, 0.06)',
                  border: '1px solid rgba(110, 231, 183, 0.15)',
                  borderRadius: 2,
                  px: 2.5,
                  py: 1.5,
                  minWidth: 170,
                }}
              >
                {stat.icon}
                <Box>
                  <Typography
                    sx={{
                      fontSize: '1.6rem',
                      fontWeight: 800,
                      lineHeight: 1,
                      fontFamily: '"Space Grotesk", sans-serif',
                      color: 'text.primary',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary', mt: 0.3, letterSpacing: '0.04em' }}>
                    {stat.label}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </motion.div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <Paper
            elevation={0}
            sx={{
              border: '1px solid rgba(110, 231, 183, 0.12)',
              borderRadius: 3,
              overflow: 'hidden',
              position: 'relative',
              lineHeight: 0, // kills the inline baseline gap on the SVG child
            }}
          >
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{ scale: 127, center: [0, 20] }}
              style={{ width: '100%', height: 'auto', display: 'block' }}
              viewBox="0 0 800 450"
            >
              {/* Ocean fill — covers the full viewBox so no gaps show at any edge */}
              <rect x={0} y={0} width={800} height={450} fill="#16161f" />
              <ZoomableGroup
                maxZoom={40}
                onMove={handleMove}
                translateExtent={[[0, 0], [800, 450]]}
              >
                {/* ── Country fills ── */}
                <Geographies geography={WORLD_URL}>
                  {({ geographies }: { geographies: { rsmKey: string; [key: string]: unknown }[] }) =>
                    geographies.map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        style={{
                          default: { fill: '#1e1e2e', stroke: '#2a2a3e', strokeWidth: 0.4, outline: 'none' },
                          hover:   { fill: '#22223a', stroke: '#2a2a3e', strokeWidth: 0.4, outline: 'none' },
                          pressed: { fill: '#22223a', stroke: '#2a2a3e', strokeWidth: 0.4, outline: 'none' },
                        }}
                      />
                    ))
                  }
                </Geographies>

                {/* ── US state boundaries (transparent fill, just the border lines) ── */}
                <Geographies geography={US_STATES_URL}>
                  {({ geographies }: { geographies: { rsmKey: string; [key: string]: unknown }[] }) => {
                    const sw = 0.5 / zoom;
                    return geographies.map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        style={{
                          default: { fill: 'none', stroke: '#3d3d5c', strokeWidth: sw, outline: 'none' },
                          hover:   { fill: 'none', stroke: '#3d3d5c', strokeWidth: sw, outline: 'none' },
                          pressed: { fill: 'none', stroke: '#3d3d5c', strokeWidth: sw, outline: 'none' },
                        }}
                      />
                    ));
                  }}
                </Geographies>

                {/* ── City pins ── */}
                {cities.map((city) => (
                  <Marker key={city.name} coordinates={city.coordinates}>
                    <g
                      onMouseEnter={(e) => handleMouseEnter(city, e as unknown as React.MouseEvent)}
                      onMouseMove={(e) => handleMouseMove(e as unknown as React.MouseEvent)}
                      onMouseLeave={handleMouseLeave}
                      style={{ cursor: 'pointer' }}
                    >
                      {/* Transparent hit area so the full pin is hoverable */}
                      <circle cx={0} cy={-9 * pinScale} r={8 * pinScale} fill="transparent" />
                      <MapPin active={hoveredCity?.name === city.name} scale={pinScale} />
                    </g>
                  </Marker>
                ))}
              </ZoomableGroup>
            </ComposableMap>

            <Box
              sx={{
                position: 'absolute',
                bottom: 12,
                right: 16,
                color: 'text.secondary',
                fontSize: '0.7rem',
                opacity: 0.45,
              }}
            >
              Scroll to zoom · Drag to pan
            </Box>
          </Paper>
        </motion.div>
      </Container>

      {/* Floating tooltip */}
      <AnimatePresence>
        {hoveredCity && (
          <motion.div
            key={hoveredCity.name}
            initial={{ opacity: 0, scale: 0.9, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 4 }}
            transition={{ duration: 0.13 }}
            style={{
              position: 'fixed',
              left: tooltipPos.x + 14,
              top: tooltipPos.y - 44,
              zIndex: 9999,
              pointerEvents: 'none',
            }}
          >
            <Box
              sx={{
                bgcolor: 'rgba(22, 22, 31, 0.97)',
                border: '1px solid rgba(110, 231, 183, 0.35)',
                borderRadius: 1.5,
                px: 1.5,
                py: 0.75,
                backdropFilter: 'blur(12px)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.55)',
                whiteSpace: 'nowrap',
              }}
            >
              <Typography sx={{ color: 'primary.main', fontSize: '0.82rem', fontWeight: 700, lineHeight: 1.3 }}>
                {hoveredCity.name}
              </Typography>
              <Typography sx={{ color: 'text.secondary', fontSize: '0.7rem', lineHeight: 1.4 }}>
                {hoveredCity.region}
              </Typography>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}

export default Travels;
