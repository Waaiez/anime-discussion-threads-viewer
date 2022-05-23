import Image from "next/image";
import Link from "next/link";

export default function Data({ data }) {
  return (
    <Link href={`/anime/${data.id}`}>
      <li className="relative cursor-pointer select-none group">
        <div className="block w-full aspect-w-2 aspect-h-3 rounded-lg bg-slate-100 group-hover:ring-2 group-hover:ring-slate-100 overflow-hidden select-none">
          <Image
            src={
              data.coverImage.large ||
              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mOcv3j9fwYiAOOoQvoqBACcpB1r8c0b1gAAAABJRU5ErkJggg=="
            }
            alt={data.title.romaji + " Image"}
            layout="fill"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mOcv3j9fwYiAOOoQvoqBACcpB1r8c0b1gAAAABJRU5ErkJggg=="
          />
        </div>
        <p className="mt-2 block text-sm font-medium text-slate-100 truncate pointer-events-none select-none">
          {data.title.romaji}
        </p>
      </li>
    </Link>
  );
}
