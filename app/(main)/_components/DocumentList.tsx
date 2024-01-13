'use client';

import { api } from '@/convex/_generated/api';
import { Doc, Id } from '@/convex/_generated/dataModel';
import { cn } from '@/lib/utils';
import { useQuery } from 'convex/react';
import { FileIcon } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import Item from './Item';

interface DocumentListProps {
	parentDocumentId?: Id<'documents'>;
	level?: number;
	data?: Doc<'documents'>[];
}

export default function DocumentList({
	parentDocumentId,
	level = 0,
	data,
}: DocumentListProps) {
	const params = useParams();
	const router = useRouter();
	const [expended, setExpended] = useState<Record<string, boolean>>({});

	const onExpend = (documentId: string) => {
		setExpended((prevExpended) => ({
			...prevExpended,
			[documentId]: !prevExpended[documentId],
		}));
	};

	const documents = useQuery(api.documents.getSidebar, {
		parentDocument: parentDocumentId,
	});

	const onRedirect = (documentId: string) => {
		router.push(`/documents/${documentId}`);
	};

	if (documents === undefined) {
		return (
			<>
				<Item.Skeleton level={level} />
				{level === 0 && (
					<>
						<Item.Skeleton level={level} />
						<Item.Skeleton level={level} />
					</>
				)}
			</>
		);
	}

	return (
		<>
			<p
				className={cn(
					'hidden text-sm font-medium text-muted-foreground/80',
					expended && 'last:block',
					level === 0 && 'hidden'
				)}
				style={{ paddingLeft: level ? `${level * 12 + 25}px` : undefined }}
			>
				No page inside
			</p>
			{documents.map((document) => (
				<div key={document._id}>
					<Item
						id={document._id}
						onClick={() => onRedirect(document._id)}
						label={document.title}
						icon={FileIcon}
						documentIcon={document.icon}
						active={params.documentId === document._id}
						level={level}
						onExpand={() => onExpend(document._id)}
						expanded={expended[document._id]}
					/>
					{expended[document._id] && (
						<DocumentList parentDocumentId={document._id} level={level + 1} />
					)}
				</div>
			))}
		</>
	);
}
