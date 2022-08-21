import { Box, Grid, Heading, Text, useBreakpointValue } from '@chakra-ui/react'
import { Link } from 'gatsby'

import { BlogPreviewCard } from '~components/blog-components/BlogPreviewCard'
import { Container } from '~components/Container'
import { Header } from '~components/Header'
import { SEO } from '~components/SEO'
import { BlogPostsProps } from '~types/page-props/blogPosts.props'
import { IndexLayout } from '../layouts'

const Blog = ({ data }: BlogPostsProps) => (
  <>
    <SEO title="Blog" />
    <IndexLayout
      background={`${useBreakpointValue({
        base: '',
        sm: 'url(/background/top-left.svg) left top no-repeat, '
      })}url(/background/top-right.svg) right top no-repeat`}
    >
      <Box>
        <Header>
          <Container>
            <Heading as="h1">Legújabb posztjaink</Heading>
          </Container>
        </Header>
        <Container>
          <Grid templateColumns={`repeat(${useBreakpointValue({ base: 1, md: 2 })}, 1fr)`} gap={{ base: 24, sm: 10 }}>
            {data.allMarkdownRemark.nodes.map((post) => (
              <BlogPreviewCard key={post.fields.slug} post={post} />
            ))}
          </Grid>
          <Box textAlign="right" mt={8}>
            <Text as={Link} fontSize="lg" to="/archive" color="orange.400" _hover={{ color: 'tomato', textDecor: 'underline' }}>
              Még több...
            </Text>
          </Box>
        </Container>
      </Box>
    </IndexLayout>
  </>
)

export default Blog