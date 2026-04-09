import React, { useState } from 'react';
import { Box, Button, CircularProgress, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { Document, Page, pdfjs } from 'react-pdf';
import DownloadIcon from '@mui/icons-material/Download';
import resume from '../Johann_A_Resume.pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

function Resume(): React.ReactElement {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [containerWidth, setContainerWidth] = useState(800);

  const containerRef = (node: HTMLDivElement | null) => {
    if (node) setContainerWidth(node.getBoundingClientRect().width);
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      sx={{ minHeight: '100vh', pt: 14, pb: 12, background: '#0d0d10' }}
    >
      <Container maxWidth="md">
        {/* Header row */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            mb: 5,
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Box>
            <Typography
              sx={{
                color: 'primary.main',
                letterSpacing: '0.22em',
                fontSize: '0.7rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                mb: 0.5,
              }}
            >
              Resume
            </Typography>
            <Typography variant="h3" fontWeight={700}>
              My CV
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            href={resume}
            download="Johann_Antisseril_Resume.pdf"
            sx={{
              bgcolor: 'primary.main',
              color: '#0d0d10',
              fontWeight: 700,
              '&:hover': {
                bgcolor: 'primary.light',
                boxShadow: '0 8px 24px rgba(110, 231, 183, 0.3)',
              },
              transition: 'all 0.25s ease',
            }}
          >
            Download PDF
          </Button>
        </Box>

        {/* PDF viewer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Box
            ref={containerRef}
            sx={{
              border: '1px solid rgba(110, 231, 183, 0.14)',
              borderRadius: 2,
              overflow: 'hidden',
              bgcolor: 'background.paper',
              boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
            }}
          >
            <Document
              file={resume}
              onLoadSuccess={({ numPages }) => setNumPages(numPages)}
              loading={
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 10 }}>
                  <CircularProgress color="primary" />
                </Box>
              }
              error={
                <Box sx={{ p: 6, textAlign: 'center' }}>
                  <Typography color="text.secondary">
                    Could not load PDF. Please use the download button above.
                  </Typography>
                </Box>
              }
            >
              {numPages &&
                Array.from({ length: numPages }, (_, i) => (
                  <Page
                    key={i + 1}
                    pageNumber={i + 1}
                    width={containerWidth}
                    renderTextLayer
                    renderAnnotationLayer
                  />
                ))}
            </Document>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}

export default Resume;
