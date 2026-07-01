'use client';

import Slider from 'react-slick';
import type { CustomArrowProps, Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import type { BlogPost } from '@data/blog-posts';
import { BlogSpotlightCard } from '@/components/blog/BlogSpotlightCard';

interface BlogSpotlightSliderProps {
  posts: BlogPost[];
}

function PrevArrow({ onClick, className }: CustomArrowProps) {
  return (
    <button
      type="button"
      className={`blog-slider-arrow blog-slider-arrow-prev ${className ?? ''}`}
      onClick={onClick}
      aria-label="Previous articles"
    >
      ‹
    </button>
  );
}

function NextArrow({ onClick, className }: CustomArrowProps) {
  return (
    <button
      type="button"
      className={`blog-slider-arrow blog-slider-arrow-next ${className ?? ''}`}
      onClick={onClick}
      aria-label="Next articles"
    >
      ›
    </button>
  );
}

export function BlogSpotlightSlider({ posts }: BlogSpotlightSliderProps) {
  const canSlide = posts.length > 2;

  const settings: Settings = {
    dots: canSlide,
    infinite: false,
    speed: 450,
    slidesToShow: Math.min(2, posts.length),
    slidesToScroll: 1,
    autoplay: canSlide,
    autoplaySpeed: 5500,
    pauseOnHover: true,
    pauseOnFocus: true,
    arrows: canSlide,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          infinite: false,
          autoplay: posts.length > 1,
          dots: posts.length > 1,
        },
      },
    ],
  };

  if (posts.length === 1) {
    return (
      <div className="blog-spotlight-slider">
        <BlogSpotlightCard post={posts[0]!} />
      </div>
    );
  }

  return (
    <div className="blog-spotlight-slider">
      <Slider {...settings}>
        {posts.map((post) => (
          <div key={post.href} className="blog-spotlight-slide">
            <BlogSpotlightCard post={post} />
          </div>
        ))}
      </Slider>
    </div>
  );
}
